-- CreateTable
CREATE TABLE "InterviewAI" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "humeChatId" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewAI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewAI_userId_idx" ON "InterviewAI"("userId");

-- AddForeignKey
ALTER TABLE "InterviewAI" ADD CONSTRAINT "InterviewAI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
