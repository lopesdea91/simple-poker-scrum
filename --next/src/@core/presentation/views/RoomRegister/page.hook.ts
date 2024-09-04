import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormFields = () => {
  const shema = z.object({
    id: z.string(),
    name: z.string().min(5, "o campo nome precisa de no mínimo 5 caracteres"),
    players: z.array(
      z.object({
        uid: z.string(),
        displayName: z.string(),
        photoURL: z.string(),
      })
    ),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof shema>>({
    defaultValues: {
      id: "",
      name: "",
      players: [],
    },
    resolver: zodResolver(shema),
  });

  const values = watch();

  return { values, errors, isLoading: isSubmitting, setValue, handleSubmit };
};
