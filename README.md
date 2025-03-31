# Sedrino Components

Registery of Tanstack related components.

# Form Components Documentation

This project uses Tanstack Form with custom components for building type-safe, validated forms. This document provides examples and usage guides for all form components.

## Table of Contents
- [Basic Setup](#basic-setup)
- [Form Components](#form-components)
  - [TextField](#textfield)
  - [SelectField](#selectfield)
  - [RadioGroupField](#radiogroupfield)
  - [CheckboxField](#checkboxfield)
  - [CheckboxGroupField](#checkboxgroupfield)
  - [SwitchField](#switchfield)
  - [SliderField](#sliderfield)
  - [ColorPickerField](#colorpickerfield)
  - [CurrencyField](#currencyfield)
  - [TextAreaField](#textareafield)
- [Utility Components](#utility-components)
  - [ValidationError](#validationerror)
  - [ShowIf](#showif)
  - [DevHelper](#devhelper)
  - [Blocker](#blocker)
  - [SubmitButton](#submitbutton)
  - [UnsavedChangesIndicator](#unsavedchangesindicator)

## Basic Setup

To create a new form, use the `useAppForm` hook from `@/hooks/use-app-form`:

```tsx
import { useAppForm } from "@/hooks/use-app-form";
import { z } from "zod"; // For validation

function MyForm() {
  const form = useAppForm({
    defaultValues: {
      // Initial form values
      name: "",
      email: "",
      // ...other fields
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        // ...validation for other fields
      }),
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },

  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        {/* Form fields go here */}
        
        <form.SubmitButton />
      </form.AppForm>
    </form>
  );
}
```

## Form Components

### TextField

TextField is used for text input, with support for various HTML input types and input masking.

**Basic Usage:**
```tsx
<form.AppField
  name="name"
  children={(field) => (
    <>
      <Label htmlFor={field.name}>Name</Label>
      <field.TextField field={field} label="Name" />
      <field.ValidationError />
    </>
  )}
/>
```

**With Type:**
```tsx
<field.TextField field={field} label="Email" type="email" />
<field.TextField field={field} label="Password" type="password" />
<field.TextField field={field} label="Age" type="number" />
```

**With Mask:**
```tsx
<field.TextField
  field={field}
  label="Phone"
  mask="(___) ___-____"
/>
```

### SelectField

SelectField creates a dropdown selection component.

```tsx
<form.AppField
  name="country"
  children={(field) => (
    <>
      <Label htmlFor={field.name}>Country</Label>
      <field.SelectField
        field={field}
        label="Country"
        options={[
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "United Kingdom", value: "uk" },
        ]}
        placeholder="Select a country"
        clearable
      />
      <field.ValidationError />
    </>
  )}
/>
```

### RadioGroupField

RadioGroupField creates a group of radio buttons.

```tsx
<form.AppField
  name="gender"
  children={(field) => (
    <>
      <Label htmlFor={field.name}>Gender</Label>
      <field.RadioGroupField label="Gender" field={field}>
        <field.RadioGroupItemField
          field={field}
          value="male"
          label="Male"
        />
        <field.RadioGroupItemField
          field={field}
          value="female"
          label="Female"
        />
        <field.RadioGroupItemField
          field={field}
          value="other"
          label="Other"
        />
      </field.RadioGroupField>
      <field.ValidationError />
    </>
  )}
/>
```

### CheckboxField

CheckboxField creates a single checkbox for boolean values.

```tsx
<form.AppField
  name="agreeToTerms"
  children={(field) => (
    <>
      <field.CheckboxField
        field={field}
        label="I agree to the terms and conditions"
      />
      <field.ValidationError />
    </>
  )}
/>
```

### CheckboxGroupField

CheckboxGroupField creates a group of checkboxes for multiple selection.

```tsx
<form.AppField
  name="interests"
  children={(field) => (
    <>
      <Label className="mb-2 block">Interests</Label>
      <field.CheckboxGroupField
        field={field}
        options={[
          { label: "Sports", value: "sports" },
          { label: "Music", value: "music" },
          { label: "Movies", value: "movies" },
          { label: "Reading", value: "reading" },
          { label: "Cooking", value: "cooking" },
        ]}
      />
      <field.ValidationError />
    </>
  )}
/>
```

### SwitchField

SwitchField creates a toggle switch.

```tsx
<form.AppField
  name="theme"
  children={(field) => (
    <>
      <Label className="mb-2 block">Theme</Label>
      <div className="flex items-center justify-between">
        <span>Light</span>
        <field.SwitchField
          field={field}
          onValue="dark"
          offValue="light"
        />
        <span>Dark</span>
      </div>
      <field.ValidationError />
    </>
  )}
/>
```

### SliderField

SliderField creates a slider for selecting numeric values within a range.

```tsx
<form.AppField
  name="satisfaction"
  children={(field) => (
    <>
      <Label className="mb-2 block">Satisfaction Level</Label>
      <field.SliderField
        field={field}
        min={0}
        max={100}
        step={1}
        showValue
        valueSuffix="%"
      />
      <field.ValidationError />
    </>
  )}
/>
```

### ColorPickerField

ColorPickerField creates a color picker component.

```tsx
<form.AppField
  name="favoriteColor"
  children={(field) => (
    <>
      <Label className="mb-2 block">Favorite Color</Label>
      <field.ColorPickerField field={field} showColorText />
      <field.ValidationError />
    </>
  )}
/>
```

### CurrencyField

CurrencyField creates an input for currency values with formatting.

```tsx
<form.AppField
  name="budget"
  children={(field) => (
    <>
      <Label className="mb-2 block">Monthly Budget</Label>
      <field.CurrencyField
        field={field}
        currency="USD"
        locale="en-US"
        placeholder="0.00"
      />
      <field.ValidationError />
    </>
  )}
/>
```

### TextAreaField

TextAreaField creates a multi-line text input.

```tsx
<form.AppField
  name="comments"
  children={(field) => (
    <>
      <Label htmlFor={field.name}>Comments</Label>
      <field.TextAreaField field={field} />
      <field.ValidationError />
    </>
  )}
/>
```

## Utility Components

### ValidationError

ValidationError displays error messages for form fields.

```tsx
<field.ValidationError />
```

### ShowIf

ShowIf conditionally renders content based on form values.

```tsx
<form.ShowIf when={({ values }) => values.hasAddress === true}>
  {/* Content to show only when hasAddress is true */}
  <form.AppField name="address" /* ... */ />
</form.ShowIf>
```

### DevHelper

DevHelper shows form state debug information (useful during development).

```tsx
<form.DevHelper />
```

### Blocker

Blocker prevents navigation away from the form if there are unsaved changes.

```tsx
<form.Blocker
  when={form.state.isDirty}
  message="You have unsaved changes. Are you sure you want to leave?"
/>
```

### SubmitButton

SubmitButton is a button to submit the form with loading state handling.

```tsx
<form.SubmitButton className="w-full" />
```

### UnsavedChangesIndicator

UnsavedChangesIndicator displays a visual indicator when the form has unsaved changes.

```tsx
<form.UnsavedChangesIndicator />
```