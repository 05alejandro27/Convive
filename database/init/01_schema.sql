CREATE TABLE "community"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "community" ADD PRIMARY KEY("id");
ALTER TABLE "community" ADD CONSTRAINT "community_address_unique" UNIQUE("address");

CREATE TABLE "apartment"(
    "id" SERIAL NOT NULL,
    "community_id" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "door" VARCHAR(10) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "apartment" ADD PRIMARY KEY("id");
ALTER TABLE "apartment" ADD CONSTRAINT "apartment_community_floor_door_unique" UNIQUE("community_id", "floor", "door");
ALTER TABLE "apartment" ADD CONSTRAINT "apartment_community_id_foreign" FOREIGN KEY("community_id") REFERENCES "community"("id");

CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name_1" VARCHAR(50) NOT NULL,
    "last_name_2" VARCHAR(50) NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT TRUE,
    "role" VARCHAR(20) NOT NULL CHECK ("role" IN('PRESIDENT', 'RESIDENT')),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "users" ADD PRIMARY KEY("id");
ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");

CREATE TABLE "user_apartment"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "apartment_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "user_apartment" ADD PRIMARY KEY("id");
ALTER TABLE "user_apartment" ADD CONSTRAINT "user_apartment_pair_unique" UNIQUE("user_id", "apartment_id");
ALTER TABLE "user_apartment" ADD CONSTRAINT "user_apartment_apartment_unique" UNIQUE("apartment_id");
ALTER TABLE "user_apartment" ADD CONSTRAINT "user_apartment_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE "user_apartment" ADD CONSTRAINT "user_apartment_apartment_id_foreign" FOREIGN KEY("apartment_id") REFERENCES "apartment"("id");

CREATE TABLE "invitations"(
    "id" SERIAL NOT NULL,
    "apartment_id" INTEGER NOT NULL,
    "code" VARCHAR(8) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT FALSE,
    "used_by" INTEGER NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "expires_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "invitations" ADD PRIMARY KEY("id");
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_code_unique" UNIQUE("code");
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_apartment_id_foreign" FOREIGN KEY("apartment_id") REFERENCES "apartment"("id");
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_used_by_foreign" FOREIGN KEY("used_by") REFERENCES "users"("id");

CREATE TABLE "budget"(
    "id" SERIAL NOT NULL,
    "community_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "annual_amount" DECIMAL(10, 2) NOT NULL CHECK ("annual_amount" > 0),
    "emergency_fund" DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK ("emergency_fund" >= 0),
    "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK ("status" IN('OPEN', 'CLOSED')),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT "budget_dates_valid" CHECK ("end_date" > "start_date")
);
ALTER TABLE "budget" ADD PRIMARY KEY("id");
ALTER TABLE "budget" ADD CONSTRAINT "budget_community_id_foreign" FOREIGN KEY("community_id") REFERENCES "community"("id");

CREATE TABLE "expenses"(
    "id" SERIAL NOT NULL,
    "budget_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NULL,
    "type" VARCHAR(20) NOT NULL CHECK ("type" IN('FIXED', 'VARIABLE')),
    "cost" DECIMAL(10, 2) NOT NULL CHECK ("cost" > 0),
    "month" INTEGER NOT NULL CHECK ("month" BETWEEN 1 AND 12),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "expenses" ADD PRIMARY KEY("id");
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budget_id_foreign" FOREIGN KEY("budget_id") REFERENCES "budget"("id");

CREATE TABLE "polls"(
    "id" SERIAL NOT NULL,
    "community_id" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK ("status" IN('OPEN', 'CLOSED')),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "deadline" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "polls" ADD PRIMARY KEY("id");
ALTER TABLE "polls" ADD CONSTRAINT "polls_community_id_foreign" FOREIGN KEY("community_id") REFERENCES "community"("id");
ALTER TABLE "polls" ADD CONSTRAINT "polls_creator_id_foreign" FOREIGN KEY("creator_id") REFERENCES "users"("id");

CREATE TABLE "votes"(
    "id" SERIAL NOT NULL,
    "poll_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "value" VARCHAR(20) NOT NULL CHECK ("value" IN('IN_FAVOR', 'AGAINST', 'ABSTAIN')),
    "voted_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "votes" ADD PRIMARY KEY("id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_poll_user_unique" UNIQUE("poll_id", "user_id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_poll_id_foreign" FOREIGN KEY("poll_id") REFERENCES "polls"("id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
