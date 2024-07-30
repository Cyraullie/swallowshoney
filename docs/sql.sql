INSERT INTO `type_users` (`id`, `name`) VALUES (1, 'client');
INSERT INTO `type_users` (`id`, `name`) VALUES (2, 'entreprise');
INSERT INTO `type_users` (`id`, `name`) VALUES (3, 'admin');

INSERT INTO `group_products` (`id`,`name`) VALUES (1,'miel');
INSERT INTO `group_products` (`id`,`name`) VALUES (2,'hydromel');
INSERT INTO `group_products` (`id`,`name`) VALUES (3,'bougie');

INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (1,'miel','miel originaire du corcelles',15.50,10,1,'mielgen.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (2,'hydormel','produit dérivé du miel',25.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (3,'hydromel piquant','sdfsfsdfs',30.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (4,'hydromel à la noisette','tgfhfhf',30.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (5,'hydromel à la framboise','dfd',30.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (6,'hydromel à la pèche','gdg',30.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (7,'hydromel à la fraise','d',30.00,0,2,'HYDROMEL-MOELLEUX-NATURE.jpg');
INSERT INTO `products` (`id`,`name`,`description`,`price`,`discount`,`group_products_id`,`imgsrc`) VALUES (8,'bougie goût bite','d',14.00,0,3,'bougie.avif');