export default function initPlansController(db) {
  const show = async (request, response) => {
    await db.Plan.findOne({
      where: {
        id: request.params.plannerId,
      },
    })
      .then((plan) => {
        response.send(plan);
        // console.log(plan);
      })
      .catch((error) => console.log(error));
  };

  const update = async (request, response) => {
    const { plannerId } = request.params;
    const plan = await db.Plan.findOne({ where: { id: plannerId } });
    const updatedPlan = {
      breakfastRecipe: request.body.breakfastMealInput,
      lunchRecipe: request.body.lunchMealInput,
      dinnerRecipe: request.body.dinnerMealInput,
      updatedAt: new Date(),
    };

    try {
      await plan.update(updatedPlan);
      response.send({ success: true });
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  };

  return {
    show,
    update,
  };
}
