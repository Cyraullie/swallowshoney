-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SwallowsHoneyDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SwallowsHoneyDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SwallowsHoneyDB` DEFAULT CHARACTER SET utf8 ;
USE `SwallowsHoneyDB` ;

-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`type_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`type_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(255) NOT NULL,
  `type_users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_type_users1_idx` (`type_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_type_users1`
    FOREIGN KEY (`type_users_id`)
    REFERENCES `SwallowsHoneyDB`.`type_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`group_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`group_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` INT NULL,
  `group_products_id` INT NOT NULL,
  `imgsrc` VARCHAR(255) NOT NULL,
  `actual_quantity` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_products_group_products_idx` (`group_products_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_group_products`
    FOREIGN KEY (`group_products_id`)
    REFERENCES `SwallowsHoneyDB`.`group_products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `npa` VARCHAR(100) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `users_id` INT NOT NULL,
  `default` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_addresses_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_addresses_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `SwallowsHoneyDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total_price` DECIMAL(10,2) NOT NULL,
  `users_id` INT NOT NULL,
  `nb_order` VARCHAR(255) NOT NULL,
  `created_date` DATE NOT NULL,
  `addresses_id` INT NOT NULL,
  `state` ENUM('new', 'open', 'send', 'close') NOT NULL DEFAULT 'new',
  `tva` DECIMAL(10,2) NOT NULL,
  `shipping_costs` DECIMAL(10,2) NULL,
  `additional_message` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_orders_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_orders_addresses1_idx` (`addresses_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `SwallowsHoneyDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `SwallowsHoneyDB`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SwallowsHoneyDB`.`orders_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SwallowsHoneyDB`.`orders_has_products` (
  `orders_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_has_products_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_orders_has_products_orders1_idx` (`orders_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_has_products_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `SwallowsHoneyDB`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `SwallowsHoneyDB`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
