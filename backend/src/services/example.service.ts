import { Execution } from "../models/execution.model";


export async function addExecution(data: any) {
  const execution = new Execution({
    resourceId: data.resourceId,
    flavor: data.flavor,
  });
  await execution.save();

  return execution;
}

export async function updateStatusFromQueue(id: string) {
  const max = 8;
  const min = 3;

  const waitForMs = Math.floor(Math.random() * (max - min + 1) + min) * 1000;

  console.log(`Waiting for ${waitForMs} ms to save...`);

  await new Promise((resolve) => setTimeout(resolve, waitForMs));

  const execution = Execution.findOneAndUpdate(
    { _id: id },
    { status: "SUCCESS", finishedAt: new Date() },
    { new: true }
  );

  console.log(`Update complete`);

  return execution;
}

export async function fetchExecutionById(id: string) {
  const execution = Execution.findOne({ _id: id });

  return execution;
}

export async function fetchAllExecutions() {
  const executions = Execution.find();

  return executions;
}
