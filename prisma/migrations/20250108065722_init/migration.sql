-- CreateTable
CREATE TABLE "event_card_template" (
    "id" UUID NOT NULL,
    "thumbnail_image_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_card" (
    "id" UUID NOT NULL,
    "template_id" UUID NOT NULL,
    "thumbnail_image_id" UUID NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "address_detail" VARCHAR(255) NOT NULL,
    "invitation_message" TEXT NOT NULL,
    "event_time" TIMESTAMPTZ(0) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_card_message" (
    "id" UUID NOT NULL,
    "event_card_id" UUID NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_card_message_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "event_card_template" ADD CONSTRAINT "event_card_template_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "attachment_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_card" ADD CONSTRAINT "event_card_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "event_card_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_card" ADD CONSTRAINT "event_card_thumbnail_image_id_fkey" FOREIGN KEY ("thumbnail_image_id") REFERENCES "attachment_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_card_message" ADD CONSTRAINT "event_card_message_event_card_id_fkey" FOREIGN KEY ("event_card_id") REFERENCES "event_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
