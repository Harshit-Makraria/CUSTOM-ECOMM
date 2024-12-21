"use client";

import React, { useState } from "react";
import Link from "next/link";

const DesignReviewForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="mt-6">
        <label className="flex items-center space-x-2">
          <input
            id="authorization-checkbox"
            type="checkbox"
            className="form-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="text-sm text-gray-700">
            I have authorization to use the design, I have reviewed and approve it.
          </span>
        </label>
      </div>

      <div className="mt-6 flex space-x-4">
        <Link
          href={isChecked ? "/cart" : "#"}
          id="continue-button"
          className={`px-4 py-2 rounded font-semibold ${
            isChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={!isChecked}
        >
          Continue
        </Link>
        <button className="px-4 py-2 rounded bg-gray-100 text-gray-700 border font-semibold hover:bg-gray-200">
          Edit my design
        </button>
      </div>
    </>
  );
};

export default DesignReviewForm;
