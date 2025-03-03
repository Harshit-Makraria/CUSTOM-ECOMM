    "use client";
    import { useState, ChangeEvent, FormEvent } from "react";
    import type { OurFileRouter } from "@/app/api/uploadthing/core";
    import { UploadButton } from "@uploadthing/react";
    import { useCreateproduct } from "@/features/product/api/use-create-product";
    import { useParams, useRouter } from "next/navigation";

    const Canvasprint = ({ categoryId }: { categoryId: string }) => {
    const router = useRouter();

    console.log(categoryId)
    const [file, setFile] = useState<File | null>(null);
    const { productname } = useParams();
    const mutation = useCreateproduct();
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        name: "Canvas print ",
        h1: "Promote your brand with durable, lightweight Canvas print",
        description: [
        "Select your own custom size from the size drop down and design your Canvas print or choose one of the 9 standard sizes available!",
        "Pre-designed Canvas print templates available for occasions like Birthday, Promotional Events etc.",
        "Vertical or horizontal designed Canvas print layouts available (both Indoor & outdoor options).",
        ],
        description1: [
        "Sharp, full-colour printing.",
        "Durable material (Vinyl Canvas print).",
        "Hang your Canvas print easily with optional metal eyelets (strongly recommended – they make it a lot easier!).",
        ],
        size: "",
        eyelets: false,
        height: "",
        width: "",
        price: "",
        cod: false,
        min_quantity: "",
    });
    const [orientation, setOrientation] = useState<"horizontal" | "vertical">("vertical"); // Default to vertical

  const sizeOptions: {
    vertical: Record<string, { height: string; width: string }>;
    horizontal: Record<string, { height: string; width: string }>;
  } = {
    vertical: {

    "20 cm × 30 cm": { height: "20", width: "30" },
    "30 cm × 40 cm": { height: "30", width: "40" },
    "40 cm × 60 cm": { height: "40", width: "60" },
    "50 cm × 70 cm": { height: "50", width: "70" },
    },
    horizontal: {
        "30 cm × 20 cm": { height: "30", width: "20" },
        "30 cm × 30 cm": { height: "30", width: "30" },
        "40 cm × 30 cm": { height: "40", width: "30" },
        "60 cm × 40 cm": { height: "60", width: "40" },
        "70 cm × 50 cm": { height: "70", width: "50" },
    },
  };



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
    const handleOrientationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOrientation(e.target.value as "horizontal" | "vertical");
        setFormData((prev) => ({
          ...prev,
          size: "",
          height: "",
          width: "",
        }));
      };
    
      const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value;
        if (sizeOptions[orientation][selectedSize]) {
          setFormData((prev) => ({
            ...prev,
            size: selectedSize,
            height: sizeOptions[orientation][selectedSize].height,
            width: sizeOptions[orientation][selectedSize].width,
          }));
        }
      };
    const handleInputChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    

        // Update the form data with selected size and price
        setFormData({
        name: "Canvas print",
        h1: "Promote your brand with durable, lightweight Canvas print",
        description: [
            "Select your own custom size from the size drop down and design your Canvas print or choose one of the 9 standard sizes available!",
            "Pre-designed Canvas print templates available for occasions like Birthday, Promotional Events etc.",
            "Vertical or horizontal designed Canvas print layouts available (both Indoor & outdoor options).",
        ],
        description1: [
            "Sharp, full-colour printing.",
            "Durable material (Vinyl Canvas print).",
            "Hang your Canvas print easily with optional metal eyelets (strongly recommended – they make it a lot easier!).",
        ],
        size: `${formData.height}x${formData.width}`, // Concatenate height and width
        price: formData.price,
        height: formData.height,
        width: formData.width,
        cod: formData.cod,
        eyelets: formData.eyelets,
        min_quantity: formData.min_quantity,
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
        size: [`${formData.height}x${formData.width}`],
        price: [parseInt(formData.price)],
        height: parseInt(formData.height),
        width: parseInt(formData.width),
        min_quantity: parseInt(formData.min_quantity),
        eyelets: formData.eyelets ? "Yes" : "No",
        cod: formData.cod ? "Yes" : "No",
        } as {
        canvaNo: number;
        categoryId: string;
        name: string;
        description: string;
        imageUrl: string;
        size: string[];
        price: number[];
        height: number;
        width: number;
        min_quantity: number;
        eyelets: string;
        cod: string;
        });

        console.log("Form Data:", formData);
        console.log("Uploaded File:", file);
    };

    const teleport = () => {
        setTimeout(() => {
        window.location.href = `/admin/create-product/${categoryId}`;
        }, 1000);
        // router.push(`/admin/create-product/${categoryId}`);
        
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
            />   {/* Orientation Selection */}
            <div className="mb-4">
              <label className="block font-bold">Orientation:</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="orientation"
                    value="vertical"
                    checked={orientation === "vertical"}
                    onChange={handleOrientationChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Vertical</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="orientation"
                    value="horizontal"
                    checked={orientation === "horizontal"}
                    onChange={handleOrientationChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Horizontal</span>
                </label>
              </div>
            </div>
    
            {/* Size Selection Dropdown */}
            <div className="mb-4">
              <label>Size:</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleSizeChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-2 text-black"
              >
                <option value="">Select a size</option>
                {Object.keys(sizeOptions[orientation]).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-filled Height & Width */}
            
            <div className="mb-4">
            <label>Width:</label>
            <input type="text" name="width" value={formData.width} disabled className="w-full border border-gray-300 rounded-md p-2 mt-2 text-black bg-gray-100"/>
            </div>
            <div className="mb-4">
            <label>Height:</label>
            <input type="text" name="height" value={formData.height} disabled className="w-full border border-gray-300 rounded-md p-2 mt-2 text-black bg-gray-100"/>
            </div>

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
            
            <div className="mb-4 font-bold">
            Minimum Quantity
            <input
                type="text"
                id="min_quantity"
                name="min_quantity"
                value={formData.min_quantity}
                onChange={handleInputChange}
                placeholder="Minimum Quantity"
                className="w-full border border-gray-300 rounded-md p-2 mt-4 font-normal text-black "
            />
            </div>
            <div className="mb-4">
            <label
                htmlFor="cod"
                className="Canvas print items-center space-x-2"
            >
                <input
                type="checkbox"
                id="cod"
                name="cod"
                checked={formData.cod}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Cash on Delivery</span>
            </label>
            </div>

            {/* <div className="mb-4">
            <label
                htmlFor="eyelets"
                className="Canvas print items-center space-x-2"
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
            </div> */}

            {/* Submit Button */}
            <button onClick={teleport} 
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
            Submit
            </button>
        </form>
        </div>
    );
    };

    export default Canvasprint;
