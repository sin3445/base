/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `fechaActualizacion` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaActualizacion` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrasena` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaActualizacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Diseno3D" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "configuracionJson" TEXT NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    CONSTRAINT "Diseno3D_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("id", "usuarioId") SELECT "id", "usuarioId" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "total" REAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido" ("clienteId", "id", "total", "usuarioId") SELECT "clienteId", "id", "total", "usuarioId" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Carpintero',
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("id", "rol") SELECT "id", "rol" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
