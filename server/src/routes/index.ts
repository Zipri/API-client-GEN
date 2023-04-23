import express from "express";
import specRouter from "./spec";
import generatorRouter from "./generator";
import generatedClientRouter from "./generated-client";

export const useRouter = (app: ReturnType<typeof express>) => {
  app.use('/api/spec', specRouter);
  app.use('/api/generator', generatorRouter);
  app.use('/api/generated-client', generatedClientRouter);
};