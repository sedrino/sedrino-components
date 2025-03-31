import { createFormHook } from "@tanstack/react-form";

// THIS IS A TEST

import { Blocker } from "@/components/form-fields/blocker";
// Import form field components
import { CheckboxField } from "@/components/form-fields/checkbox";
import { CheckboxGroupField } from "@/components/form-fields/checkbox-group";
import { ColorPickerField } from "@/components/form-fields/color-picker";
import { CurrencyField } from "@/components/form-fields/currency-field";
import { DateField } from "@/components/form-fields/date-field";
import { DateTimeField } from "@/components/form-fields/date-time-field";
import { DevHelper } from "@/components/form-fields/dev-helper";
import {
  fieldContext,
  formContext,
} from "@/components/form-fields/form-context";
import {
  RadioGroupField,
  RadioGroupItemField,
} from "@/components/form-fields/radio-group";
import { SelectField } from "@/components/form-fields/select";
import { ShowIf } from "@/components/form-fields/show-if";
import { SliderField } from "@/components/form-fields/slider";
import { SubmitButton } from "@/components/form-fields/submit";
import { SwitchField } from "@/components/form-fields/switch";
import { TextAreaField } from "@/components/form-fields/text-area";
import { TextField } from "@/components/form-fields/text-field";
import { TimeField } from "@/components/form-fields/time-field";
import { UnsavedChangesIndicator } from "@/components/form-fields/unsaved-changes";
import { ValidationError } from "@/components/form-fields/validation-error";

// Form components that pre-bind events from the form hook; check our "Form Composition" guide for more
// We also support Valibot, ArkType, and any other standard schema library

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
    ValidationError,
    RadioGroupField,
    RadioGroupItemField,
    TextAreaField,
    CheckboxField,
    CheckboxGroupField,
    SwitchField,
    SliderField,
    ColorPickerField,
    CurrencyField,
    DateField,
    DateTimeField,
    TimeField,
  },
  formComponents: {
    ShowIf,
    DevHelper,
    Blocker,
    SubmitButton,
    UnsavedChangesIndicator,
  },
  fieldContext,
  formContext,
});
