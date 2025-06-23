import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const initialBusinesses = [
  { name: "Acme Corporation", industry: "Technology", employees: 250, revenue: "$5.4M", status: "Active" },
  { name: "Globex", industry: "Finance", employees: 150, revenue: "$3.1M", status: "Inactive" },
  { name: "Tech Solutions", industry: "Software", employees: 80, revenue: "$2.0M", status: "Active" },
  { name: "Creative Minds", industry: "Marketing", employees: 45, revenue: "$950K", status: "Active" },
  { name: "Global Ventures", industry: "Logistics", employees: 130, revenue: "$4.7M", status: "Inactive" },
];

function Business() {
  const [businesses] = useState(initialBusinesses);
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState("Active");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleVerify = () => {
    setIsChecked(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsChecked(false);
    setIsModalOpen(false);
  };

  const TabButton = ({ id, label, activeTab, setActiveTab }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-t-md text-sm font-medium transition duration-200
      ${activeTab === id
          ? "bg-white border border-b-transparent border-gray-300 text-blue-600 shadow-sm"
          : "bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-white"
        }`}
    >
      {label}
    </button>
  );


  const filteredBusinesses = businesses.filter(
    (biz) => biz.status === filter
  );



  const handleNameClick = (biz) => {
    setSelectedBusiness(biz);
  };

  const closeModal = () => {
    setSelectedBusiness(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Business Overview</h2>
          <p className="text-sm text-gray-500">Manage and track all registered business records.</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search businesses..."
            className="flex-1 lg:flex-none px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            <FaSearch className="text-sm" />
            <span className="text-sm font-medium">Search</span>
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        {["Active", "Inactive"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition 
        ${filter === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"}`}
          >
            {status}
          </button>
        ))}
      </div>


      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Employees</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBusinesses.map((biz, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td
                  className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => handleNameClick(biz)}
                >
                  {biz.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{biz.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{biz.employees}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{biz.revenue}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${biz.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}
                  >
                    {biz.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onClick={handleCheckboxClick}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            {filteredBusinesses.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">No businesses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>
            <div className="mb-5">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Globlex
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p><strong>contactPerson:</strong> {selectedBusiness.contactPerson}</p>
                <p><strong>email:</strong> {selectedBusiness.email}</p>
                <p><strong>Phone:</strong> {selectedBusiness.phone}</p>
                <p><strong>Category:</strong> {selectedBusiness.category}</p>
                <p><strong>Sub-category:</strong> {selectedBusiness.subCategory}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-b">
              <TabButton id="overview" label="Overview" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton id="address" label="Address & Socials" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton id="gallery" label="Gallery" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton id="keywords" label="Keywords" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton id="payment" label="Payment & Certifications" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>


            {/* Logo */}
            <div className="p-6 text-sm text-gray-700">
              {activeTab === "overview" && (
                <>
                  {selectedBusiness.logoUrl && (
                    <img
                      src={selectedBusiness.logoUrl}
                      alt="Business Logo"
                      className="w-24 h-24 object-contain mb-4"
                    />
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p><strong>ABN:</strong> {selectedBusiness.abn}</p>
                    <p><strong>Established:</strong> {selectedBusiness.establishedYear}</p>
                    <p><strong>Website:</strong> <a className="text-blue-600 underline" href={selectedBusiness.website} target="_blank" rel="noreferrer">{selectedBusiness.website}</a></p>
                    <p><strong>Description:</strong> {selectedBusiness.description}</p>
                    <p><strong>Promotions:</strong> {selectedBusiness.promotions}</p>
                  </div>
                </> 
              )}

              {/* Address */}
              {activeTab === "address" && (
                <div className="space-y-6 mt-4">
                  {/* Address */}
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600 text-sm">
                      {selectedBusiness.address?.street}, {selectedBusiness.address?.suburb},{" "}
                      {selectedBusiness.address?.state} {selectedBusiness.address?.postcode}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="font-semibold text-gray-800">Social Links</h3>
                    <div className="flex gap-4 text-blue-600 text-sm underline">
                      {selectedBusiness.socialLinks?.facebook && (
                        <a href={selectedBusiness.socialLinks.facebook} target="_blank" rel="noreferrer">
                          Facebook
                        </a>
                      )}
                      {selectedBusiness.socialLinks?.instagram && (
                        <a href={selectedBusiness.socialLinks.instagram} target="_blank" rel="noreferrer">
                          Instagram
                        </a>
                      )}
                      {selectedBusiness.socialLinks?.linkedin && (
                        <a href={selectedBusiness.socialLinks.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <h3 className="font-semibold text-gray-800">Service Areas</h3>
                    {selectedBusiness.serviceAreas?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedBusiness.serviceAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No service areas available.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  {/* Gallery Images */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Gallery</h3>
                    {selectedBusiness.gallery?.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {selectedBusiness.gallery.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Gallery ${index}`}
                            className="w-32 h-24 object-cover rounded shadow"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No gallery images available.</p>
                    )}
                  </div>

                  {/* Intro Video */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Intro Video</h3>
                    {selectedBusiness.introVideo ? (
                      <iframe
                        src={selectedBusiness.introVideo}
                        title="Intro Video"
                        className="w-full h-64 rounded shadow"
                        frameBorder="0"
                        allowFullScreen
                      />
                    ) : (
                      <p className="text-gray-500">No intro video available.</p>
                    )}
                  </div>
                </div>
              )}


              {/* Keywords */}
              {activeTab === "keywords" && (
                <>
                  {selectedBusiness.keywords?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.keywords.map((kw, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{kw}</span>
                      ))}
                    </div>
                  ) : (
                    <p>No keywords available.</p>
                  )}
                </>
              )}


              {/* Payment Methods */}
              {activeTab === "payment" && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Payment Methods</h3>
                    {selectedBusiness.paymentMethods?.length > 0 ? (
                      <div className="mt-4">
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {selectedBusiness.paymentMethods.map((method, i) => (
                            <li key={i}>{method}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No Paymethod Add</p>
                    )}
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 mt-5">Certifications</h3>
                    {selectedBusiness.certifications?.length > 0 ? (
                      <div className="mt-4">
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {selectedBusiness.certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No Certification Add</p>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}


      {/* Checkbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Verification</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to verify this item?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Business;
