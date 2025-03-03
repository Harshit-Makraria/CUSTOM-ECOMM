// page.tsx
import React from "react";
import BannerForm from "../_components/banner-form";
import StandeeForm from "../_components/standee-form";
import FlexForm from "../_components/flex-form";
import Tabletopstandee from "../_components/tabletopstandee-form";
import Buisnessenvelop from "../_components/buisnessenv";
import Tabletopsign from "../_components/tabletopsign";
import Foamboard from "../_components/foamboard";
import Canvasprint from "../_components/canvasprint";
const formMapping: Record<string, React.ComponentType<{categoryId:string}>> = {
  banner: BannerForm,
  standee: StandeeForm,
  flex: FlexForm,
  tabletopstandee: Tabletopstandee,
  buisnessenvelop: Buisnessenvelop,
  tabletopsign: Tabletopsign,
  foamboard: Foamboard,
  canvasprint: Canvasprint,
  
};

export default function Page({ params , searchParams }: { params: { productname: string } ,searchParams: {categoryId:string} }) {
  const { productname } = params;
  const {categoryId} = searchParams
  
  const FormComponent = formMapping[productname.toLowerCase()] || null;
console.log(FormComponent)
console.log('check')
  return (
    <div>
      {FormComponent ? (
        <FormComponent categoryId={categoryId} />
      ) : (
        <p>Sorry, no form available for this product.</p>
      )}
    </div>
  );
}
