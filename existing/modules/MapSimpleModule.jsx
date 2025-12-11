import React from "react";
import { ModuleBase, HeadingTag } from "components";
import GoogleMapReact from "google-map-react";

const MapSimpleModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div className="container flex flex-col lg:flex-row justify-between md:items-start  lg:items-center">
        <div className="w-full md:max-w-md lg:max-w-1/2 lg:p-10">
          {data.contactDetails?.map((contact, index) => (
            <div key={index} className="mt-6 first:mt-0 first:mb-10">
              <HeadingTag
                data={contact.headingTitle}
                className="text-paragraph md:large-paragraph font-semibold"
              />
              <div
                dangerouslySetInnerHTML={{ __html: contact.description }}
                className="richtext-content"
              />
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 aspect-7/6 mt-6 lg:mt-0">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
            defaultCenter={{
              lat: Number(data.latitude),
              lng: Number(data.longitude),
            }}
            defaultZoom={data.zoom}
          />
        </div>
      </div>
    </ModuleBase>
  );
};

export default MapSimpleModule;
