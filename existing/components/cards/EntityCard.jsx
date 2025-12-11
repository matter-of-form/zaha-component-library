import PropTypes from "prop-types";
import GenericCardSmall from "./GenericCardSmall";
import GenericCardLarge from "./GenericCardLarge";
import ProductRestaurantCardLarge from "./ProductRestaurantCardLarge";
import ProductRestaurantCardSmall from "./ProductRestaurantCardSmall";
import ProductRoomCardLarge from "./ProductRoomCardLarge";
import ProductRoomCardSmall from "./ProductRoomCardSmall";
import ArticleCardSmall from "./ArticleCardSmall";
import ArticleCardLarge from "./ArticleCardLarge";
import classNames from "classnames";

const EntityCard = ({ data, large, className, loading, ...props }) => {
  let _props = { ...props };
  let Component = null;
  if (data.moduleName === "GenericCardModel") {
    Component = large ? GenericCardLarge : GenericCardSmall;
  } else if (data.moduleName === "RestaurantCard") {
    Component = large ? ProductRestaurantCardLarge : ProductRestaurantCardSmall;
  } else if (data.moduleName === "RoomCard") {
    Component = large ? ProductRoomCardLarge : ProductRoomCardSmall;
  } else if (data.moduleName === "ArticleCard") {
    if (large) {
      Component = ArticleCardLarge;
      _props = { ..._props, loading };
    } else {
      Component = ArticleCardSmall;
    }
  }

  return Component ? (
    <Component
      data={data.props}
      className={classNames(
        className,
        `${data.moduleName}${large ? "Large" : "Small"}`,
      )}
      {..._props}
    />
  ) : (
    data.moduleName + " card not implemented"
  );
};

EntityCard.propTypes = {
  data: PropTypes.object.isRequired,
  large: PropTypes.bool,
};

export default EntityCard;
