"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/features/order/use-create-order";
import { useGetcart } from "@/features/cart/api/use-get-cart";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";
import { UseUser } from "@/app/(dashboard)/_component/user-provider";
import { useCreateAddress } from "@/features/address/api/use-create-address";
import { Address } from "@prisma/client";
import { UserResponse } from "@/features/user/api/use-get-user";
import { useUpdateUser } from "@/features/user/api/use-update-user";

// Component for the Delivery Address Form

// Component for individual form fields
const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    placeholder={placeholder}
    className={cn("w-full border border-gray-300 rounded-lg p-3", className)}
    value={value}
    onChange={onChange}
    {...props}
  />
);

const DeliveryAddressForm = ({
  showCancel,
  onSave,
}: {
  onSave: (formData: any) => void;
  showCancel:boolean;
}) => {
  const { mutate } = useCreateAddress();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    country: "India",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    defaultShipping: false,
    defaultBilling: false,
  });

  const handleformsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      ...formData,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pincode = e.target.value;
    setFormData((prev) => ({ ...prev, pincode })); // Update pincode in state

    if (pincode.length === 6) {
      try {
        // Fetch state and city using an API (replace with your chosen API)
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const postOffice = response.data[0]?.PostOffice?.[0];

        if (postOffice) {
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District || "",
            state: postOffice.State || "",
          }));
        } else {
          alert("Invalid pincode or no data found!");
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
        alert("Failed to fetch city/state. Please try again.");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        city: "",
        state: "",
      }));
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
      <form className="space-y-4" onSubmit={handleformsubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            placeholder="First Name*"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            type="text"
            placeholder="Last Name*"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <InputField
          type="number"
          required
          className="no-spinner"
          placeholder="Phone*"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          className="w-full border border-gray-300 rounded-lg p-3"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option>India</option>
        </select>
        <InputField
          type="text"
          placeholder="Address*"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Apartment, suite, unit, or floor (Optional)"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputField
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Pincode*"
            name="pincode"
            required
            value={formData.pincode}
            onChange={handlePincodeChange}
          />
          <InputField
            type="text"
            placeholder="City/town*"
            name="city"
            value={formData.city}
            onChange={handleChange}
            readOnly
          />
          <select
            className="w-full border border-gray-300 rounded-lg p-3"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value={formData.state}>
              {formData.state || "Select state"}
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="defaultShipping"
              className="w-4 h-4"
              checked={formData.defaultShipping}
              onChange={handleChange}
            />
            <span>Set as default shipping address</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="defaultBilling"
              className="w-4 h-4"
              checked={formData.defaultBilling}
              onChange={handleChange}
            />
            <span>Set as default billing address</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Save Delivery Address →
        </button>
      </form>
    </div>
  );
};

// Component to display the saved address
const SavedAddress = ({
  onEdit,
  user,
  onPlaceOrder,
  defaultBilling,
  onAddNewAddress,
  defaultShipping,
  setSelectAddress
}: {
  onEdit:Dispatch<SetStateAction<boolean>>;
  onPlaceOrder: () => void;
  setSelectAddress : ()=>void;
  user:UserResponse['data'];
  defaultShipping: Address | null;
  onAddNewAddress:Dispatch<SetStateAction<{shipping:boolean , billing:boolean}>>
  defaultBilling: Address | null;
}) => (
  <div className="border border-gray-200 rounded-lg p-6">
     
     <Button className="ml-[37vw] text-[12px] w-28 h-8 mb-4" onClick={()=>{onEdit(true)}}>
      +Add New Address
     </Button>
     
    {/* Render defaultShipping if it exists */}
    {defaultShipping && (
      <div className="mb-4">
        <div className="flex justify-between pr-2 items-center">
          <h3 className="text-lg font-bold">Default Shiping Address</h3>
          <button   onClick={()=>onAddNewAddress(pre=>({...pre , billing:true}))} >Change</button>
        </div>
        <p>
          {defaultShipping.firstName} {defaultShipping.lastName}
        </p>
        <p>{defaultShipping.address}</p>
        <p>
          {defaultShipping.city}, {defaultShipping.state}{" "}
          {defaultShipping.pincode}
        </p>
        <p>{defaultShipping.country}</p>
      </div>
    )}

    {/* Render defaultBilling if it exists */}
    {defaultBilling && (
      <div className="mb-4">
        <div className="flex justify-between pr-2 items-center">
          <h3 className="text-lg font-bold">Default Billing Address</h3>
          <button onClick={()=>onAddNewAddress(pre=>({...pre , shipping:true}))} >Change</button>
        </div>
        <p>
          {defaultBilling.firstName} {defaultBilling.lastName}
        </p>
        <p>{defaultBilling.address}</p>
        <p>
          {defaultBilling.city}, {defaultBilling.state} {defaultBilling.pincode}
        </p>
        <p>{defaultBilling.country}</p>
      </div>
    )}
  
    

    <Button disabled={!(!!defaultBilling&&!!defaultShipping)} onClick={onPlaceOrder} className="">
      Proceed to Order
    </Button>
  </div>
);

// GST Input Component
const GSTInput = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">GST Identification Number</h2>
      <div className="flex items-center gap-4 mb-6">
        <InputField type="text" placeholder="Enter your GSTIN" />
        <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200">
          Apply
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        For business use only. Company name and state listed in GST registration
        must match billing address.{" "}
        <a href="#" className="text-blue-500 underline">
          About GST
        </a>
      </p>
    </div>
  );
};

// Component for the Order Summary
const OrderSummary = ({
  data = [],
  totalAmount,
}: {
  data: any[];
  totalAmount: number;
}) => (
  <div className="border border-gray-200 rounded-lg p-6">
    <GSTInput />
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    <div className="flex justify-between border-t border-gray-200 pt-4">
      <p className="text-lg font-semibold">Total due</p>
      <p className="text-lg font-semibold">₹{totalAmount || 0}.00</p>
    </div>
    {data.length > 0 ? (
      <>
        <h3 className="text-xl border-t border-gray-200 pt-1 font-semibold mt-3">
          Items:
        </h3>
        {data.map((item, key) => (
          <div key={key} className="flex border-b border-gray-200 pb-2 mt-4">
            <div className="w-16 h-16 rounded-lg flex justify-center">
              <img
                src={item.design.json[0].imageUrl || ""}
                alt="Product"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 ml-1 mt-1">
              <div className="flex justify-between items-start text-sm">
                <h3 className="text-md font-semibold">
                  {item.productName || "null"}
                </h3>
                <Link
                  href={`/editor/${item.designId}/${item.design.json[0].id}`}
                  className="text-sm text-red-500"
                >
                  Edit Design
                </Link>
              </div>
              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
              <p className="text-gray-500 text-sm">
                Item Total: ₹
                {parseInt(item.unitPrice?.toString() || "0") *
                  parseInt(item.quantity?.toString() || "0")}
              </p>
            </div>
          </div>
        ))}
      </>
    ) : (
      <p className="text-gray-500">No items in the cart.</p>
    )}
  </div>
);

export default function CreateOrder() {
  const { data } = useGetcart();
  const { mutate } = useCreateOrder();
  const router = useRouter();
  
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [addNewAddress , setAddingNewAddress] = useState<{shipping:boolean , billing:boolean}>({shipping:false , billing:false})

  if (typeof window === "undefined") {
    return null; // Skip rendering on the server
  }

  const totalAmount = data?.reduce((total, item) => {
    const itemTotal =
      parseInt(item.unitPrice?.toString() || "0") *
      parseInt(item.quantity?.toString() || "0");
    return total + itemTotal;
  }, 0);

  const user  = UseUser() as UserResponse['data'];
  
  const placeOrder = () => {
    if (data && data.length !== 0) {
      mutate(
        {
          cartIds: data.map((cart) => cart.id),
          
        },
        {
          onSuccess: () => {
            toast.success("Order placed");
            router.push("/orders");
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-8">Shipping</h1>
       { user && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          { isAddressSaved || (!user.defaultBilling || !user.defaultShipping )? (
            <DeliveryAddressForm  showCancel={addNewAddress.shipping || addNewAddress.billing} onSave={() => setIsAddressSaved(true)} />
          ) : (
            <SavedAddress
            //@ts-ignore
              defaultBilling={user.defaultBilling}
              user={user}
              //@ts-ignore
              defaultShipping={user.defaultShipping}
              onEdit={setIsAddressSaved}
              onAddNewAddress={setAddingNewAddress}
              set
              onPlaceOrder={placeOrder}
            />
          )}
          <OrderSummary data={data || []} totalAmount={totalAmount || 0} />
        </div>}
      </div>
    </div>
  );
}
