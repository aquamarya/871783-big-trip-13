export const createTripInfoTemplate = (event) => {
  const {startEventTime} = event;
  const getRouteInfo = () => {
    let routeInfo = [];
    for (const eventItem of event) {
      routeInfo.push(eventItem.city);
    }
    return routeInfo.reverse();
  };
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteInfo().join(` &mdash; `)}</h1>
        <p class="trip-info__dates">${startEventTime}</p>
        <p class="trip-info__dates"></p>
      </div>
    </section>
  `;
};
