import React from "react";
import Link from "next/link";
import DesignReviewForm from "./DesignReviewForm";

const DesignPreviewPage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        {/* Design Preview */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-200 p-4 rounded">
            <div className="relative w-full h-full border">
              <img
                src="/bg.jpg"
                alt="Design Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center border-dashed border-2 border-gray-400 pointer-events-none"></div>
            </div>
          </div>
          {/* Design Review */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Review your design</h2>
            <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
              <li>Are the text and images clear and easy to read?</li>
              <li>Do the design elements fit in the safety area?</li>
              <li>Does the background fill out to the edges?</li>
              <li>Is everything spelled correctly?</li>
            </ul>

            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mt-6">
              <p className="text-sm">
                <strong>Empty text fields won’t be printed.</strong>
                <br />
                Only text fields you edited will appear. These empty text fields
                will not appear:
              </p>
              <ul className="list-none mt-2 text-sm">
                <li>
                  <em>Company Name, Business Type, web / other</em>
                </li>
              </ul>
            </div>

            {/* Client Component for Interactivity */}
            <DesignReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreviewPage;
