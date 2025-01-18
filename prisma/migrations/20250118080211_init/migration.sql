-- CreateEnum
CREATE TYPE "EventCardFileType" AS ENUM ('thumbnail_image', 'gallery_image');

-- CreateTable
CREATE TABLE "event_card" (
    "id" UUID NOT NULL,
    "template_key" TEXT NOT NULL,
    "thumbnail_image_id" UUID,
    "password" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "address_detail" VARCHAR(255) NOT NULL,
    "invitation_message" TEXT NOT NULL,
    "event_started_at" TIMESTAMPTZ(0) NOT NULL,
    "event_ended_at" TIMESTAMPTZ(0) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_card_file" (
    "id" UUID NOT NULL,
    "type" "EventCardFileType" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_card_comment" (
    "id" UUID NOT NULL,
    "event_card_id" UUID NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment_file" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "attachment_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_card" ADD CONSTRAINT "event_card_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "event_card_file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_card_file" ADD CONSTRAINT "event_card_file_id_fkey" FOREIGN KEY ("id") REFERENCES "attachment_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_card_comment" ADD CONSTRAINT "event_card_comment_event_card_id_fkey" FOREIGN KEY ("event_card_id") REFERENCES "event_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
