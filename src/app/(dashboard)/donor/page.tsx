"use client";

import { useState } from "react";
import { Plate }from "@/types/plate";
import { createPlate , getPlates} from "@/Services/plate.service";
 

const INITIAL_FORM = {
  foodName:"",
  quantity:"",
  pickupBy:"",
};

export default function DonorDashboard(){
const [plates,setPlates]= useState<Plate[]>(getPlates());
const [form,setForm]= useState(INITIAL_FORM);
const[error, setError] = useState<string | null>(null);

function handleChange(
  e:React.ChangeEvent<HTMLInputElement>
) {
  setForm({
    ...form,
    [e.target.name]:e.target.value ,
  });
}


function handleSubmit(e: React.FormEvent){
  e.preventDefault();
  setError(null);


  if(!form.foodName || !form.quantity || !form.pickupBy){
    setError("All field are required.");
    return;
  }

  const newPlate: Plate = {
    id:crypto.randomUUID(),
    foodName: form.foodName,
    quantity:form.quantity,
    pickupBy:form.pickupBy,
    status:"POSTED",
  };


  createPlate(newPlate);
  setPlates([...getPlates()]);
  setForm(INITIAL_FORM);
}

return(
  <div className="p-8 max-w-3xl">
    <h1 className="text-2xl font-bold mb-6">Donor Dashboard</h1>

    {/* Create Plate Form */}
    
    <form
    onSubmit ={handleSubmit}
    className ="border border-zinc-800 rounded-xl p-6 mb-8 space-y-4">
      <h2 className ="font-bold  text-lg">Create Plate</h2>
      {error && (
        <p className ="text-red-400 text-sm">{error}</p>

      )}

      <input 
      name="foodName"
      placeholder="Food name (e.g., Veg Biryani)"
      value ={form.foodName}
      onChange={handleChange}
      className ="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2"
      />

      <input 
      name="quantity"
      placeholder="Quantity (e.g., persons)"
      value ={form.quantity}
      onChange={handleChange}
      className ="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2"
      />

        <input
          name="pickupBy"
          placeholder="Pickup by (e.g., 9:30 PM)"
          value={form.pickupBy}
          onChange={handleChange}
          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2"
        />

        <button 
        type="submit"
        className ="bg-emerald-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-emerald-400 transition"
>
  Post Plate
</button>
    </form>



 {/* Plates List */}
      <div className="space-y-4">
        {plates.length === 0 && (
          <p className="text-zinc-400 text-sm">
            No plates created yet.
          </p>
        )}

        {plates.map((plate) => (
          <div
            key={plate.id}
            className="border border-zinc-800 rounded-lg p-4"
          >
            <div className="font-bold">{plate.foodName}</div>
            <div className="text-sm text-zinc-400">
              {plate.quantity} • Pickup by {plate.pickupBy}
            </div>
            <div className="text-xs mt-1 text-emerald-400">
              {plate.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


