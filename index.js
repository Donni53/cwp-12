const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const config = require('./config.json');

const db = require('./models')(Sequelize, config);

Promise.all([db.weapons.sync({force: true}), db.pizzas.sync({force: true}), db.turtles.sync({force: true})])
    .then(()=>
          {
              Promise.all([
                              db.weapons.create(
                                  {
                                      id: 1,
                                      name: 'katana',
                                      dps: 10
                                  }),
                              db.weapons.create(
                                  {
                                      id: 2,
                                      name: 'nunchaku',
                                      dps: 15
                                  }),
                              db.weapons.create(
                                  {
                                      id: 3,
                                      name: 'bo staf',
                                      dps: 3
                                  }),
                              db.weapons.create(
                                  {
                                      id: 4,
                                      name: 'sai',
                                      dps: 8
                                  }),
                              db.pizzas.create(
                                  {
                                      id: 1,
                                      name: 'Double Cheese Pizza',
                                      description: 'Double Cheese Pizza',
                                      calories: 100
                                  }),
                              db.pizzas.create(
                                  {
                                      id: 2,
                                      name: 'Gourmet',
                                      description: 'Gourmet',
                                      calories: 2000
                                  }),
                              db.pizzas.create(
                                  {
                                      id: 3,
                                      name: 'Mexican Green Wave',
                                      description: ' Mexican Green Wave',
                                      calories: 2500
                                  }),
                              db.pizzas.create(
                                  {
                                      id: 4,
                                      name: 'Peppy Paneer',
                                      description: 'Peppy Paneer',
                                      calories: 3010
                                  }),
                              db.pizzas.create(
                                  {
                                      id: 5,
                                      name: 'Mozzarella',
                                      description: 'Mozzarella',
                                      calories: 5100
                                  })
                          ])
                  .then(()=>
                        {
                            Promise.all([
                                            db.turtles.create(
                                                {
                                                    id: 1,
                                                    name: 'Leonardo',
                                                    color: 'blue',
                                                    weaponId: 1,
                                                    firstFavoritePizzaId: 1,
                                                    secondFavoritePizzaId: 3
                                                }),
                                            db.turtles.create(
                                                {
                                                    id: 2,
                                                    name: 'Michelangelo',
                                                    color: 'yellow',
                                                    weaponId: 2,
                                                    firstFavoritePizzaId: 5,
                                                    secondFavoritePizzaId: 2
                                                }),
                                            db.turtles.create(
                                                {
                                                    id: 3,
                                                    name: 'Donatello',
                                                    color: 'purple',
                                                    weaponId: 3,
                                                    firstFavoritePizzaId: 4,
                                                    secondFavoritePizzaId: 5
                                                }),
                                            db.turtles.create(
                                                {
                                                    id: 4,
                                                    name: 'Raphael',
                                                    color: 'red',
                                                    weaponId: 4,
                                                    firstFavoritePizzaId: 2,
                                                    secondFavoritePizzaId: 3
                                                })
                                        ])
                                .then(async () =>
                                      {
                                          console.log('Список черепашек');
                                          let turtles = await db.turtles.findAll();

                                          for(let iter of turtles)
                                          {
                                              console.log(iter.dataValues)
                                          }

                                          console.log('Список любителей мацареллы');

                                          let mozz_id = await db.pizzas.findAll({where:{name: 'Mozzarella'}});
                                          turtles = await db.turtles.findAll({where:{ firstFavoritePizzaId: mozz_id[0].dataValues.id}});
                                          for(let iter of turtles)
                                          {
                                              console.log(iter.dataValues)
                                          }


                                          console.log('Любимые пиццы');
                                          turtles = await db.turtles.findAll();
                                          let favorite_pizzas = new Set();
                                          for(let iter of turtles)
                                          {
                                              favorite_pizzas.add(iter.dataValues.firstFavoritePizzaId);
                                              favorite_pizzas.add(iter.dataValues.secondFavoritePizzaId);
                                          }
                                          for( let iter of favorite_pizzas)
                                          {
                                              console.log((await db.pizzas.findById(iter)).dataValues);
                                          }


                                          await db.weapons.create(
                                              {
                                                  id: 5,
                                                  name: 'suriken',
                                                  dps: 800
                                              });

                                          await db.turtles.create(
                                              {
                                                  id: 5,
                                                  name: 'Daniil',
                                                  color: 'green',
                                                  weaponId: 5,
                                              });
                                          console.log('Новая черепашка');
                                          console.log((await db.turtles.findById(5)).dataValues);

                                          console.log('Изменение описания пицц');
                                          await db.pizzas.update({description: 'VERY FAT'}, {where: {calories:{[Op.gt]:3000}}});
                                          let pizzas = await db.pizzas.findAll();
                                          for(let iter of pizzas)
                                          {
                                              console.log(iter.dataValues);
                                          }

                                          console.log('Количество оружия с уроном больше 100');
                                          console.log(await db.weapons.count({where:{dps:{[Op.gt]:100}}}));

                                          console.log('Пицца с id = 1');
                                          console.log((await db.pizzas.findById(1)).dataValues);

                                          console.log('Добавление пиццы через объект');
                                          let test = await db.turtles.findById(5);
                                          await test.setDataValue('firstFavoritePizzaId', 5);
                                          test.save();
                                          console.log(test);
                                      });
          });
});
