// page.tsx
import React from "react";
import BannerForm from "../_components/banner-form";
import StandeeForm from "../_components/standee-form";
import FlexForm from "../_components/flex-form";
const formMapping: Record<string, React.ComponentType> = {
  banner: BannerForm,
  standee: StandeeForm,
  flex: FlexForm,
};

export default function Page({ params }: { params: { productname: string } }) {
  const { productname } = params;

  const FormComponent = formMapping[productname.toLowerCase()] || null;

  return (
    <div>
      {FormComponent ? (
        <FormComponent />
      ) : (
        <p>Sorry, no form available for this product.</p>
      )}
    </div>
  );
}
