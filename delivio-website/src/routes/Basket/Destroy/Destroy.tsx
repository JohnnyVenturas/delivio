import { ActionFunctionArgs, redirect } from "react-router-dom";
import { removeItem as removeItemDatabase } from "../../../DataLoading/getData";

export async function action (params:ActionFunctionArgs ) {
  const id = params.params.id;
  if(id == null) return redirect("../../Cos");
  await removeItemDatabase(id);
  return redirect("../../Cos");
}
