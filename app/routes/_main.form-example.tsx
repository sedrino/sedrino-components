import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { useAppForm } from "@/hooks/use-app-form";

export const Route = createFileRoute("/_main/form-example")({
  component: FormExample,
});

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18),
});

function FormExample() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: 0,
    },
    validators: {
      onChange: schema,
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppForm>
          <form.AppField
            name="name"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <field.TextField field={field} id="name" />
                <field.ValidationError />
              </div>
            )}
          />
          <form.AppField
            name="age"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <field.TextField field={field} type="number" id="age" />
                <field.ValidationError />
              </div>
            )}
          />
          <form.AppField
            name="age"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="age-text">Age (Text)</Label>
                <field.TextField
                  field={field}
                  type="text-number"
                  id="age-text"
                />
                <field.ValidationError />
              </div>
            )}
          />
          <form.AppField
            name="email"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <field.TextField field={field} type="email" id="email" />
                <field.ValidationError />
              </div>
            )}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <field.TextField field={field} type="password" id="password" />
                <field.ValidationError />
              </div>
            )}
          />
          <form.SubmitButton />
        </form.AppForm>
      </form>
    </div>
  );
}
