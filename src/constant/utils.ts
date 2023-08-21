import {
  GAgeGroup,
  GGender,
  GLevelOfFitness,
  WEEKDAYS,
} from '@/screens/internal/Routine/routine.setup.screen';
// EXERCISE DATA
import ex_back from '@/apis/data/back.json';
import ex_cardio from '@/apis/data/cardio.json';
import ex_chest from '@/apis/data/chest.json';
import ex_lower_arms from '@/apis/data/lower-arms.json';
import ex_lower_legs from '@/apis/data/lower-legs.json';
import ex_neck from '@/apis/data/neck.json';
import ex_shoulders from '@/apis/data/shoulders.json';
import ex_upper_arms from '@/apis/data/upper-arms.json';
import ex_upper_legs from '@/apis/data/upper-legs.json';
import ex_waist from '@/apis/data/waist.json';

const INTERNAL_DATA: Record<string, Array<Record<string, string>>> = {
  back: ex_back,
  cardio: ex_cardio,
  chest: ex_chest,
  'lower arms': ex_lower_arms,
  'lower legs': ex_lower_legs,
  neck: ex_neck,
  shoulders: ex_shoulders,
  'upper arms': ex_upper_arms,
  'upper legs': ex_upper_legs,
  waist: ex_waist,
};

export const EXP_BAR = 50;

export function calculateUserLevel(m_exp: number): number {
  // 10, 20, 30, 40, 50, 60, 70, 80, 90
  // 1, 2, 3, 4, 5, 6, 7, 8, 9

  // return parseInt(String(m_exp / 20), 10);
  return Math.floor(m_exp / EXP_BAR);
}

type MyExList = {
  [key in WEEKDAYS]?: {
    exercise: Record<string, string>;
    targetMuscleGroup: string;
    timeLimit: number;
  };
};
export function generateUserExercisePlan(
  level: GLevelOfFitness,
  gender: GGender,
  ageGroup: GAgeGroup,
  grindWeekday: WEEKDAYS,
  targetMuscle: string,
): MyExList {
  let ex_list: MyExList | {} = {};

  // ULTIMATE SWITCH
  switch (level) {
    case 'beginner':
      switch (ageGroup) {
        case '18-25':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
          }
          break;
        case '46+':
        case '26-35':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 60,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 40,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 40,
                },
              };
              break;
          }
          break;
        case '36-45':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 80,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 50,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 50,
                },
              };
              break;
          }
          break;
        default:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
          }
          break;
      }
      break;
    case 'intermediate':
      switch (ageGroup) {
        case '46+':
        case '18-25':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 60,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
          }
          break;
        case '26-35':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 80,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 50,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 50,
                },
              };
              break;
          }
          break;
        case '36-45':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 100,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 60,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 60,
                },
              };
              break;
          }
          break;
        default:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 60,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
          }
          break;
      }
      break;
    case 'advanced':
      switch (ageGroup) {
        case '46+':
        case '18-25':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 21),
                  timeLimit: 80,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 50,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 50,
                },
              };
              break;
          }
          break;
        case '26-35':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 21),
                  timeLimit: 100,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 60,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 60,
                },
              };
              break;
          }
          break;
        case '36-45':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 21),
                  timeLimit: 120,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 70,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 70,
                },
              };
              break;
          }
          break;
        default:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 21),
                  timeLimit: 80,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 50,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 50,
                },
              };
              break;
          }
          break;
      }
      break;
    default:
      switch (ageGroup) {
        case '18-25':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
          }
          break;
        case '46+':
        case '26-35':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 60,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
          }
          break;
        case '36-45':
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 16),
                  timeLimit: 80,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 50,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 50,
                },
              };
              break;
          }
          break;
        default:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 11),
                  timeLimit: 40,
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercise: INTERNAL_DATA[targetMuscle].slice(0, 8),
                  timeLimit: 30,
                },
              };
              break;
          }
          break;
      }
      break;
  }

  return ex_list as MyExList;
}
