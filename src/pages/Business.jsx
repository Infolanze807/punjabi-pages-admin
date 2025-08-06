import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  featureBussiness,
  getBusinessCategory,
  popularBussiness,
  statusBussiness,
} from "../redux/features/businessSlice";
import FullPageLoader from "../components/Loader/Loader";
import { toast } from "react-toastify";

function Business() {
  const dispatch = useDispatch();

  const { BusinessCategory, loading } = useSelector(
    (state) => state.business
  );
  const [status, setStatus] = useState(true);

  useEffect(() => {
    dispatch(getBusinessCategory({ keyword: "", page: 1, status }));
  }, [dispatch, status]);

  const businesses = BusinessCategory?.businesses;
  console.log("Bussiness", businesses);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [hoveredBizId, setHoveredBizId] = useState(null);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [selectedFeatureBiz, setSelectedFeatureBiz] = useState(null);
  const [selectedPopularBiz, setSelectedPopularBiz] = useState(null);
  const [popularModalOpen, setPopularModalOpen] = useState(false);

  const handleCheckboxClick = (e, biz) => {
    e.preventDefault();
    setData(biz);
    setIsModalOpen(true);
  };

  const handleVerify = async () => {
    setLoading2(true); // Start loading

    try {
      if (data) {
        const updatedStatus = { status: !data.status };

        const resultAction = await dispatch(
          statusBussiness({
            bussinessId: data._id,
            statusData: updatedStatus,
          })
        );

        console.log("Status Update Response:", resultAction);

        if (statusBussiness.fulfilled.match(resultAction)) {
          console.log("Updated Business Data:", resultAction.payload);
        } else {
          console.error("Failed to update status:", resultAction.payload);
        }

        dispatch(
          getBusinessCategory({
            keyword,
            page: 1,
            status,
          })
        );
      }
    } catch (error) {
      console.error("Error verifying business:", error);
    } finally {
      setLoading2(false); // End loading
      setIsModalOpen(false); // Close modal
    }
  };

  const handleSearch = () => {
    dispatch(getBusinessCategory({ keyword, page: 1, status }));
  };

  const handleCancel = () => {
    setIsChecked(false);
    setIsModalOpen(false);
  };

  const handleFeatureToggle = (biz) => {
    setSelectedFeatureBiz(biz);
    setFeatureModalOpen(true);
  };

  const handlePopularToggle = (biz) => {
    setSelectedPopularBiz(biz);
    setPopularModalOpen(true);
  };

  const TabButton = ({ id, label, activeTab, setActiveTab }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border
      ${activeTab === id
          ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      {label}
    </button>
  );

  // const filteredBusinesses = businesses.filter((biz) => {
  //   return filter === "Active" ? biz.status === true : biz.status === false;
  // });

  const statusMap = {
    Active: true,
    Inactive: false,
  };

  const handleNameClick = (biz) => {
    setSelectedBusiness(biz);
  };

  const closeModal = () => {
    setSelectedBusiness(null);
  };

  const confirmFeatureToggle = async () => {
    if (!selectedFeatureBiz) return;

    const featurePayload = { isFeature: !selectedFeatureBiz.isFeature };
    try {
      const resultAction = await dispatch(
        featureBussiness({
          bussinessId: selectedFeatureBiz._id,
          featureData: featurePayload,
        })
      );

      if (featureBussiness.fulfilled.match(resultAction)) {
        dispatch(getBusinessCategory({ keyword, page: 1, status }));
      } else {
        console.error("Feature update failed:", resultAction.error.message);
      }
    } catch (err) {
      console.error("Feature API error:", err);
    } finally {
      setFeatureModalOpen(false);
      setSelectedFeatureBiz(null);
    }
  };

  const confirmPopularToggle = async () => {
    if (!selectedPopularBiz) return;
    const popularPayload = { popular: !selectedPopularBiz.popular };
    try {
      const resultAction = await dispatch(
        popularBussiness({
          bussinessId: selectedPopularBiz._id,
          popularData: popularPayload,
        })
      );

      if (popularBussiness.fulfilled.match(resultAction)) {
        dispatch(getBusinessCategory({ keyword, page: 1, status }));
      } else {
        console.error("Popular update failed:", resultAction.error.message);
      }
    } catch (err) {
      console.error("Popular API error:", err);
    } finally {
      setPopularModalOpen(false);
      setSelectedPopularBiz(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Business Overview
              </h2>
              <p className="text-slate-600">
                Manage and track all registered business records.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full lg:w-80 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <FaSearch className="text-sm" />
                <span className="text-sm">Search</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Filter by status:</span>
              {Object.keys(statusMap).map((label) => (
                <button
                  key={label}
                  onClick={() => setStatus(statusMap[label])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${status === statusMap[label]
                      ? "bg-blue-100 text-blue-800 border-blue-300 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <FullPageLoader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      No.
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      Business Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      Category
                    </th>
                    <th className="px-2 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      Sub Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">
                      Action
                    </th>
                    {status && (
                      <th className="px-6 py-3 text-left font-semibold text-slate-700 text-sm tracking-wider border-b border-slate-200">
                        Feature
                      </th>
                    )}
                    {status && (
                      <th className="px-6 py-3 text-left font-semibold text-slate-700 text-sm tracking-wider border-b border-slate-200">
                        Popular
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {businesses?.map((biz, index) => (
                    <tr
                      key={biz._id || index}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                        {index + 1}
                      </td>
                      <td
                        className="relative px-3 py-4 whitespace-nowrap text-blue-600 font-medium cursor-pointer hover:underline group-hover:text-blue-700"
                        onClick={() => handleNameClick(biz)}
                        onMouseEnter={() => setHoveredBizId(biz._id || index)}
                        onMouseLeave={() => setHoveredBizId(null)}
                      >
                        {biz.businessName}
                        {hoveredBizId === (biz._id || index) && (
                          <div className="absolute left-1/2 bottom-10 z-10 mt-2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded px-3 py-1 text-xs text-gray-700 whitespace-nowrap">
                            View Detail
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                          {biz.category}
                        </span>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-slate-600">
                        {biz.subCategory}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                        {biz.email}
                      </td>
                      <td className="py-2 whitespace-nowrap text-slate-600 text-center">
                        <input
                          type="checkbox"
                          checked={biz.status}
                          onClick={(e) => handleCheckboxClick(e, biz)}
                          readOnly
                          className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 hover:bg-blue-50 transition-colors duration-200"
                        />
                      </td>
                      {status && (
                        <td className="py-4 whitespace-nowrap text-slate-600 text-center">
                          <input
                            type="checkbox"
                            checked={biz.isFeature}
                            onClick={(e) => {
                              e.preventDefault();
                              handleFeatureToggle(biz);
                            }}
                            readOnly
                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 hover:bg-blue-50 transition-colors duration-200"
                          />
                        </td>
                      )}
                      {status && (
                        <td className="py-4 whitespace-nowrap text-slate-600 text-center">
                          <input
                            type="checkbox"
                            checked={biz.popular}
                            onClick={(e) => {
                              e.preventDefault();

                              const popularCount = businesses.filter((b) => b.popular).length;

                              if (biz.popular) {
                                // Allow unchecking
                                handlePopularToggle(biz);
                              } else if (popularCount < 4) {
                                // Allow checking if less than 4 already checked
                                handlePopularToggle(biz);
                              } else {
                                // Show warning if limit exceeded
                                toast.warning("Only 4 businesses can be marked as popular.");
                              }
                            }}
                            readOnly
                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 hover:bg-blue-50 transition-colors duration-200"
                          />
                        </td>
                      )}

                    </tr>
                  ))}
                  {businesses?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-slate-500">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-slate-900">No businesses found</h3>
                            <p className="text-slate-500">Try adjusting your search criteria</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedBusiness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {selectedBusiness.logoUrl && (
                    <img
                      src={selectedBusiness.logoUrl}
                      alt="Business Logo"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-sm"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedBusiness.businessName}
                    </h2>
                    <p className="text-slate-600">{selectedBusiness.category} • {selectedBusiness.subCategory}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contact Person:</span>
                        <span className="font-medium text-slate-800">{selectedBusiness.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="font-medium text-slate-800">{selectedBusiness.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Phone:</span>
                        <span className="font-medium text-slate-800">{selectedBusiness.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3">Business Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">ABN:</span>
                        <span className="font-medium text-slate-800">{selectedBusiness.abn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Established:</span>
                        <span className="font-medium text-slate-800">{selectedBusiness.establishedYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Website:</span>
                        <a href={selectedBusiness.website} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                          {selectedBusiness.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
                <TabButton
                  id="overview"
                  label="Overview"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  id="address"
                  label="Address & Socials"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  id="gallery"
                  label="Gallery"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  id="keywords"
                  label="Keywords"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  id="payment"
                  label="Payment & Certifications"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedBusiness.description}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-3">Promotions</h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedBusiness.promotions}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "address" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-3">Address</h3>
                      <p className="text-sm text-slate-700">
                        {selectedBusiness.address?.street}, {selectedBusiness.address?.suburb}, {selectedBusiness.address?.state} {selectedBusiness.address?.postcode}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-3">Social Links</h3>
                      <div className="flex gap-4">
                        {selectedBusiness.socialLinks?.facebook && (
                          <a href={selectedBusiness.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Facebook
                          </a>
                        )}
                        {selectedBusiness.socialLinks?.instagram && (
                          <a href={selectedBusiness.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                            Instagram
                          </a>
                        )}
                        {selectedBusiness.socialLinks?.linkedin && (
                          <a href={selectedBusiness.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-800 text-sm font-medium">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Add other tab contents as needed */}
                {activeTab === "gallery" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-600">Gallery content will be displayed here</p>
                  </div>
                )}

                {activeTab === "keywords" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p className="text-slate-600">Keywords content will be displayed here</p>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-slate-600">Payment & certifications content will be displayed here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Checkbox Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {data?.status ? "Deactivate Business?" : "Activate Business?"}
                </h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to {data?.status ? "deactivate" : "activate"} <strong>{data?.businessName}</strong>?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
                    disabled={loading2}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerify}
                    className={`flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors duration-200 ${data?.status ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      }`}
                    disabled={loading2}
                  >
                    {loading2 ? (
                      <div className="spinner mx-auto"></div>
                    ) : (
                      `${data?.status ? "Deactivate" : "Activate"}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {featureModalOpen && selectedFeatureBiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {selectedFeatureBiz.isFeature ? "Unfeature Business?" : "Feature Business?"}
                </h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to {selectedFeatureBiz.isFeature ? "unfeature" : "feature"} <strong>{selectedFeatureBiz.businessName}</strong>? <br />
                  <span className="italic text-sm text-slate-500">(dashboard view)</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setFeatureModalOpen(false);
                      setSelectedFeatureBiz(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmFeatureToggle}
                    className={`flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors duration-200 ${selectedFeatureBiz.isFeature
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      }`}
                  >
                    {selectedFeatureBiz.isFeature ? "Unfeature" : "Feature"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {popularModalOpen && selectedPopularBiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {selectedPopularBiz.popular ? "Unpopular Business?" : "Popular Business?"}
                </h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to {selectedPopularBiz.popular ? "unpopular" : "popular"} <strong>{selectedPopularBiz.businessName}</strong>? <br />
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPopularModalOpen(false);
                      setSelectedPopularBiz(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPopularToggle}
                    className={`flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors duration-200 ${selectedPopularBiz.popular
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      }`}
                  >
                    {selectedPopularBiz.popular ? "Unpopular" : "Popular"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Business;
