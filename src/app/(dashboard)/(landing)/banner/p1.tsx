// // page.tsx
// import React from "react";
// import Banner from "./main";
// const formMapping: Record<string, React.ComponentType<{categoryId:string}>> = {
//   banner: Banner,
// };

// export default function Page({ params , searchParams }: { params: { productname: string } ,searchParams: {categoryId:string} }) {
//   const { productname } = params;
//   const {categoryId} = searchParams
//   console.log(categoryId)
//   const FormComponent = formMapping[productname.toLowerCase()] || null;

//   return (
//     <div>
//       {FormComponent ? (
//         <FormComponent categoryId={categoryId} />
//       ) : (
//         <p>Sorry, no form available for this product.</p>
//       )}
//     </div>
//   );
// }
