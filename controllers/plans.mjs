export default function initPlansController(db) {
  const show = async (request, response) => {
    await db.Plan.findOne({
      where: {
        id: request.params.id,
      },
      include: {
        model: db.Recipe,
        as: ['breakfastMeal', 'lunchMeal', 'dinnerMeal'],
      },
    })
      .then((plan) => {
        if (plan === undefined) {
          response.send({ hasPlan: false });
        }
        response.send(plan);
        console.log(plan);
      })
      .catch((error) => console.log(error));
  };
  return {
    show,
  };
}
