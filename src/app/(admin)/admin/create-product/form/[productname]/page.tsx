// page.tsx
import React from "react";
import BannerForm from "../_components/banner-form";
import StandeeForm from "../_components/standee-form";
import FlexForm from "../_components/flex-form";
const formMapping: Record<string, React.ComponentType<{categoryId:string}>> = {
  banner: BannerForm,
  standee: StandeeForm,
  flex: FlexForm,
};

export default function Page({ params , searchParams }: { params: { productname: string } ,searchParams: {categoryId:string} }) {
  const { productname } = params;
  const {categoryId} = searchParams
  console.log(categoryId)
  const FormComponent = formMapping[productname.toLowerCase()] || null;

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
