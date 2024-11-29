"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { useCreateproduct } from "@/features/product/api/use-create-product";
import { useParams } from "next/navigation";
const StandeeForm = ({categoryId} :{categoryId:string}) => {

  console.log(categoryId)
  const [file, setFile] = useState<File | null>(null);
  const { productname } = useParams();
  const mutation = useCreateproduct();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "Standee ",
    h1: "Promote your brand with durable, lightweight Standee",
    description: [
      "Select your own custom size from the size drop down and design your Standee or choose one of the 9 standard sizes available!",
      "Pre-designed Standee templates available for occasions like Birthday, Promotional Events etc.",
      "Vertical or horizontal designed Standee layouts available (both Indoor & outdoor options).",
    ],
    description1: [
      "Sharp, full-colour printing.",
      "Durable material (Vinyl Standee).",
      "Hang your Standee easily with optional metal eyelets (strongly recommended – they make it a lot easier!).",
    ],
    size: "",
    eyelets: false,
    price: "",
    CashOnDelivery: false,
  });




  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputChange1 = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleInputChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;

    // Define pricing for sizes
    const sizePricing: Record<string, number> = {
      "52*91 cm": 200,
      "76*122 cm": 300,
      "76*183 cm": 400,
      "76*244 cm": 500,
      "122*244 cm": 600,
    };

    // Update the form data with selected size and price
    setFormData({
      name: "Standee ",
      h1: "Promote your brand with durable, lightweight Standee",
      description: [
        "Select your own custom size from the size drop down and design your Standee or choose one of the 9 standard sizes available!",
        "Pre-designed Standee templates available for occasions like Birthday, Promotional Events etc.",
        "Vertical or horizontal designed Standee layouts available (both Indoor & outdoor options).",
      ],
      description1: [
        "Sharp, full-colour printing.",
        "Durable material (Vinyl Standee).",
        "Hang your Standee easily with optional metal eyelets (strongly recommended – they make it a lot easier!).",
      ],
      size: selectedSize,
      price:
        sizePricing[selectedSize]?.toString() || "Custom pricing available",

      CashOnDelivery: false,
      eyelets: false,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      canvaNo: 1,
      categoryId,
      name: productname as string,
      description: formData.description.join(""),
      imageUrl:imageUrl??"",
      price: formData.price.split(',').map(Number),
    });

    console.log("Form Data:", formData);
    console.log("Uploaded File:", file);
  };

  return (
    <div className="font-bold">
      <h1>{categoryId}</h1>
      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        {/* Upload Container */}
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">Upload Your File</h2>
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader" // Match the key from `ourFileRouter`
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              console.log("Upload Complete:", res); // `res` contains file URLs
             
            }}
            onUploadError={(error) => {
              console.error("Upload Error:", error);
              alert("Upload failed!");
            }}
          />
        </div>

        {/* Input Fields */}
        <div className="mb-4">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full border border-gray-300 font-normal rounded-md p-2 mt-4 text-black "
          />
        </div>

        <div className="mb-2">
          Title:
          <textarea
            id="h1"
            name="h1"
            value={formData.h1}
            onChange={handleInputChange}
            placeholder="h1"
            className="w-full border border-gray-300 font-normal rounded-md p-2"
          />
        </div>
        <div className="mb-2 h-auto">
          Description:
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border min-h-40 border-gray-300 font-normal rounded-md p-2"
          />
        </div>

        <div className="mb-2">
          <textarea
            id="description1"
            name="description1"
            value={formData.description1}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border min-h-40 border-gray-300 font-normal rounded-md p-2"
          />
        </div>

        <div className="mb-4 font-bold">
          Size:
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleInputChange2}
            className="w-full border border-gray-300 font-normal rounded-md p-2 mt-1"
          >
            <option value="" disabled>
              Select Size
            </option>
            <option value="52*91 cm">52*91 cm</option>
            <option value="76*122 cm">76*122 cm</option>
            <option value="76*183 cm">76*183 cm</option>
            <option value="76*244 cm">76*244 cm</option>
            <option value="122*244 cm">122*244 cm</option>
          </select>
        </div>
        <div className="mb-4 font-bold">
          Price per unit
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price per unit"
            className="w-full border border-gray-300 rounded-md p-2 mt-4 font-normal text-black "
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="CashOnDelivery"
            className="Standee items-center space-x-2"
          >
            <input
              type="checkbox"
              id="CashOnDelivery"
              name="CashOnDelivery"
              checked={formData.CashOnDelivery}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Cash on Delivery</span>
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="CashOnDelivery"
            className="Standee items-center space-x-2"
          >
            <input
              type="checkbox"
              id="eyelets"
              name="eyelets"
              checked={formData.eyelets}
              onChange={handleInputChange1}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Eyelets</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StandeeForm;
