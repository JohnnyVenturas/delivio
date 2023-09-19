import { ActionFunctionArgs, redirect, useNavigation } from "react-router-dom";
import { updateEntry } from "../../../DataLoading/getData";

export async function action(params : ActionFunctionArgs) {
  const dynamicParams = params.params; 
  const id = dynamicParams.id;
  if(id == null) throw Error("null id impossible");

  const quantity = (await params.request.formData()).get(id);
  if(quantity == null) throw Error("null quantity")

    await updateEntry(id, {quantity : Number(quantity)})
    
return redirect("../../Cos");
}
