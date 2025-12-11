/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// import _ from 'lodash';
import { PreHeading, HeadingTag } from "components";
import tailwindConfig from "../../tailwind.config.js";

const CreateTheme = () => {
  const defaultTheme = {
    themeName: "",
    baseColor: "#344356",
    txtLightColor: "#ffffff",
    txtLighterColor: "#eae6dc",
    txtDarkColor: "#000000",
    txtDarkerColor: "#323232",
    fontPrimary: "Inter",
    fontSecondary: "'Open Sans'",
  };

  const getFonts = [
    { font: tailwindConfig.theme.extend.fontFamily.inter, name: "Inter" },
    { font: tailwindConfig.theme.extend.fontFamily.openSans, name: "OpenSans" },
  ];
  const [state, setState] = useState(defaultTheme);

  // const getThemeObj = () => {
  //   const themeObj = {};
  //   themeObj[_.camelCase(state.themeName)] = {
  //     name: state.themeName,
  //     colors: {
  //       body: state.baseColor,
  //       text: state.txtLightColor,
  //       button: {
  //         text: state.txtLightColor,
  //         background: state.baseColor,
  //       },
  //       link: {
  //         text: state.txtLighterColor,
  //         opacity: 1,
  //       },
  //     },
  //     fontPrimary: state.fontPrimary,
  //   };
  //   return themeObj;
  // };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const createTheme = () => {
    // setState({ ...defaultTheme });

    var bodyStyles = document.body.style;
    bodyStyles.setProperty("--color-primary", state.baseColor);
    bodyStyles.setProperty("--color-light", state.txtLightColor);
    bodyStyles.setProperty("--color-lighter", state.txtLighterColor);
    bodyStyles.setProperty("--color-dark", state.txtDarkColor);
    bodyStyles.setProperty("--color-darker", state.txtDarkerColor);
    bodyStyles.setProperty("--font-family-primary", state.fontPrimary);
    bodyStyles.setProperty("--font-family-secondary", state.fontSecondary);
  };

  return (
    <div
      className={
        "absolute top-0 w-full h-full transition-transform duration-500 origin-left right-0 z-10 text-lightColor text-large-paragraph flex"
      }
    >
      <div className="bg-baseColor md:w-2/6 h-full md:border-r border-white/25 pt-26 pb-16 md:pt-32 px-6 md:px-10 pointer-events-auto ">
        <HeadingTag
          data={{ htag: "h1", heading: "Change theme" }}
          className="font-primary text-lightColor z-0 uppercase text-left tracking-[-.48px] my-5"
        />
        <div className="w-full md:w-[490px] grid grid-cols-1 gap-x-8 gap-y-6 font-primary">
          <div>
            <label htmlFor="th_name">Theme Name: </label>
            <input
              type="text"
              id="themeName"
              name="themeName"
              value={state.themeName}
              placeholder="Specify a name"
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="bg_color">Base Color: </label>

            <input
              type="color"
              id="bg_color"
              name="baseColor"
              value={state.baseColor}
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="txt_light_color">Light Text Color: </label>
            <input
              type="color"
              id="txt_light_color"
              name="txtLightColor"
              value={state.txtLightColor}
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="txt_lighter_color">Lighter Text Color: </label>
            <input
              type="color"
              id="txt_lighter_color"
              name="txtLighterColor"
              value={state.txtLighterColor}
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="txt_dark_color">Dark Text Color: </label>
            <input
              type="color"
              id="txt_dark_color"
              name="txtDarkColor"
              value={state.txtDarkColor}
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="txt_darker_color">Darker Text Color: </label>
            <input
              type="color"
              id="txt_darker_color"
              name="txtDarkerColor"
              value={state.txtDarkerColor}
              onChange={handleChange}
              className="input-common mx-5"
            />
          </div>
          <div>
            <label htmlFor="fontPrimary">Select Primary Font: </label>
            <select
              name="fontPrimary"
              id="fontPrimary"
              onChange={handleChange}
              value={state.fontPrimary}
              className="input-common mx-5"
            >
              {getFonts.map((font, index) => (
                <option value={font.font} key={index}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fontSecondary">Select Secondary Font: </label>
            <select
              name="fontSecondary"
              id="fontSecondary"
              onChange={handleChange}
              value={state.fontSecondary}
              className="input-common mx-5"
            >
              {getFonts.map((font, index) => (
                <option value={font.font} key={index}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={createTheme}
          className="btn secondary cursor-pointer rounded-full px-10 mt-10"
        >
          <span className="hidden sm:block"> Apply theme</span>
        </button>
      </div>

      <div
        className="text-lightColor duration-500 md:w-4/6 bg-white"
        style={{ color: state.txtLightColor, fontFamily: state.font }}
      >
        <div className="h-2/5 w-full">
          <img
            src="https://picsum.photos/1200/1000"
            className="w-full h-full block object-cover"
            alt=""
          />
        </div>

        <div className="absolute top-0 h-2/5 pt-6 pb-[64px] lg:pb-[72px] px-6 lg:py-40 md:px-10">
          <div className="title-wrapper">
            <PreHeading
              className="pre-heading mb-4 text-lightColor uppercase font-primary text-paragraph font-normal text-subheading"
              style={{
                color: state.txtLightColor,
                fontFamily: state.fontPrimary,
              }}
            >
              PreHeading
            </PreHeading>
            <HeadingTag
              data={{ htag: "h1", heading: "Preview theme" }}
              className="heading font-primary text-lightColor dark text-h1 uppercase tracking-[-0.64px]"
              style={{
                color: state.txtLightColor,
                fontFamily: state.fontPrimary,
              }}
            />
          </div>
        </div>

        <div className="md:border-r border-white/25 px-10 pointer-events-auto">
          <div>
            <HeadingTag
              data={{ htag: "h1", heading: "Light Texts" }}
              className=" font-primary z-0 uppercase text-left tracking-[-.48px] my-5"
              style={{
                color: state.txtLightColor,
                fontFamily: state.fontPrimary,
              }}
            />
            <div>
              <p
                style={{
                  color: state.txtLighterColor,
                  fontFamily: state.fontSecondary,
                }}
              >
                This is for preview only. Pick the color and font from the left
                side to see it working.
              </p>
              <button
                className="btn primary cursor-pointer rounded-full px-10 mt-10"
                style={{
                  backgroundColor: state.baseColor,
                  color: state.txtLighterColor,
                  fontFamily: state.fontSecondary,
                }}
              >
                I am a Button
              </button>{" "}
            </div>
          </div>
          <div>
            <HeadingTag
              data={{ htag: "h1", heading: "Dark Texts" }}
              className=" font-primary z-0 uppercase text-left tracking-[-.48px] my-5"
              style={{
                color: state.txtDarkColor,
                fontFamily: state.fontPrimary,
              }}
            />
            <div>
              <p
                style={{
                  color: state.txtDarkerColor,
                  fontFamily: state.fontSecondary,
                }}
              >
                This is for preview only. Pick the color and font from the left
                side to see it working.
              </p>
              <button
                className="btn secondary cursor-pointer rounded-full px-10 mt-10"
                style={{
                  backgroundColor: state.txtLightColor,
                  border: `1px solid ${state.baseColor}`,
                  borderColor: state.baseColor,
                  color: state.baseColor,
                  fontFamily: state.fontSecondary,
                }}
              >
                I am a Secondary Button
              </button>{" "}
            </div>
          </div>
        </div>

        <div
          className="bg-baseColor absolute bottom-0 w-4/6 h-20 py-7"
          style={{ backgroundColor: state.baseColor }}
        >
          <h1
            className="w-full text-center pre-heading text-lightColor uppercase font-primary font-normal"
            style={{
              color: state.txtLightColor,
              fontFamily: state.fontPrimary,
            }}
          >
            Footer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CreateTheme;
