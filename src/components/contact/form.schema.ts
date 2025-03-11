import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z.string().nonempty({ message: "Message is required" }),
});
