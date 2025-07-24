import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

// src/lib/db/schema.ts

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  date: text('date'),
  time: text('time'),
  guestCount: integer('guest_count'),
  style: text('style'),
  occasion: text('occasion'),
  addons: text('addons'), // store as CSV or JSON
});


export const pictures = sqliteTable('pictures', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  url: text('url').notNull(),
  description: text('description'),
  date: text('date'),
  time: text('time'),
  updatedAt: text('updatedAt'),
});
