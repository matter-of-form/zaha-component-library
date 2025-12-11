import React from "react";
import { ModuleBase, HeadingTag } from "components";
import GoogleMapReact from "google-map-react";

const MapFullBleedModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="relative">
      <div className="w-full h-full absolute top-0 left-0">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
          defaultCenter={{
            lat: Number(data.latitude),
            lng: Number(data.longitude),
          }}
          defaultZoom={data.zoom}
        />
      </div>
      <div className="container relative h-screen lg:h-auto">
        <div className="w-full sm:w-[480px] bg-white p-6 sm:p-10">
          {data.contactDetails?.map((contact, index) => (
            <div key={index} className="mt-6 first:mt-0">
              <HeadingTag
                data={contact.headingTitle}
                className="text-paragraph md:large-paragraph text-[18px] font-semibold"
              />
              <div
                dangerouslySetInnerHTML={{ __html: contact.description }}
                className="richtext-content"
              />
            </div>
          ))}
        </div>
      </div>
    </ModuleBase>
  );
};

export default MapFullBleedModule;
