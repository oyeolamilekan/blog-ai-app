import * as React from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

// FormFieldContext
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// FormItemContext
export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// useFormField Hook
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Ensure itemContext is available if id is needed, handle cases where it might not be (e.g. if FormItem is optional)
  if (!itemContext) {
    // This might happen if useFormField is used outside a FormItem but still within FormField.
    // Depending on requirements, you might throw an error or return default/undefined ids.
    // For now, let's assume id might be optional or throw if strictly required by all consumers.
    console.warn("useFormField is used outside <FormItem>, id-related fields will be unavailable or based on name.");
    // Fallback or throw, for now, we allow it but id-related fields will be problematic.
  }
  
  const id = itemContext?.id || fieldContext.name; // Fallback id to field name if itemContext is not there

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}; 