import { DealDamage } from "../core/actions/DealDamage.js";
import { SingleTargetCompoundAction } from "../core/actions/SingleTargetCompoundAction.js";
import { Card } from "../core/components/Card.js";

/** @type {Array<Card>} */
export const ironcladCards = [
  {
    class: Card,
    data: {
      uid: 1,
      name: "Strike",
      annotation: "1{attack}.",
      cardType: "Attack",
      energyCost: 1,
      immediateEffects: [
        {
          class: SingleTargetCompoundAction,
          data: {
            actions: [
              {
                class: DealDamage,
                data: {
                  damage: 1,
                },
              },
            ],
          },
        },
      ],
    },
  },
];
