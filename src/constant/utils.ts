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
// import ex_neck from '@/apis/data/neck.json';
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
  // 'neck and shoulders': ex_neck,
  'neck and shoulders': ex_shoulders,
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
    exercises: Array<Record<string, string>>;
    targetMuscleGroup: string;
    timeLimit: number;
  };
};
// const my_slice = [
//   [11, 8],
//   [16, 11],
//   [21, 16],
// ];
interface GenUseExPlanInterface {
  level: GLevelOfFitness;
  gender: GGender;
  ageGroup: GAgeGroup;
  grindWeekday: WEEKDAYS;
  targetMuscle: string;
}
export const G_GENDER: Array<GGender> = ['male', 'female', 'prefer not to say'];
export const AG_LIST: Array<GAgeGroup> = ['18-25', '26-35', '36-45', '46+'];
export function generateUserExercisePlan({
  level,
  gender,
  ageGroup,
  grindWeekday,
  targetMuscle,
}: GenUseExPlanInterface): MyExList {
  const my_slice_ = {
    beginner: {
      male: {
        start: 0,
        end: 11,
        timeLimit: {
          '18-25': 40,
          '26-35': 60,
          '36-45': 80,
          '46+': 60,
        },
      },
      female_un: {
        start: 0,
        end: 8,
        timeLimit: {
          '18-25': 30,
          '26-35': 40,
          '36-45': 50,
          '46+': 40,
        },
      },
    },
    intermediate: {
      male: {
        start: 0,
        end: 16,
        timeLimit: {
          '18-25': 60,
          '26-35': 80,
          '36-45': 100,
          '46+': 60,
        },
      },
      female_un: {
        start: 0,
        end: 11,
        timeLimit: {
          '18-25': 40,
          '26-35': 50,
          '36-45': 60,
          '46+': 40,
        },
      },
    },
    advanced: {
      male: {
        start: 0,
        end: 21,
        timeLimit: {
          '18-25': 80,
          '26-35': 100,
          '36-45': 120,
          '46+': 80,
        },
      },
      female_un: {
        start: 0,
        end: 16,
        timeLimit: {
          '18-25': 50,
          '26-35': 60,
          '36-45': 70,
          '46+': 50,
        },
      },
    },
  };
  let ex_list: MyExList | {} = {};
  // ULTIMATE SWITCH
  switch (level) {
    case 'beginner':
      switch (ageGroup) {
        case AG_LIST[0]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
        case AG_LIST[3]:
        case AG_LIST[1]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[1]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
          }
          break;
        case AG_LIST[2]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[2]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[2]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[2]],
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
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }

          break;
      }
      break;
    case 'intermediate':
      switch (ageGroup) {
        case AG_LIST[3]:
        case AG_LIST[0]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.male.start,
                    my_slice_.intermediate.male.end,
                  ),
                  timeLimit: my_slice_.intermediate.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
        case AG_LIST[1]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.male.start,
                    my_slice_.intermediate.male.end,
                  ),
                  timeLimit: my_slice_.intermediate.male.timeLimit[AG_LIST[1]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
          }
          break;
        case AG_LIST[2]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.male.start,
                    my_slice_.intermediate.male.end,
                  ),
                  timeLimit: my_slice_.intermediate.male.timeLimit[AG_LIST[2]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[2]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[2]],
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
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.male.start,
                    my_slice_.intermediate.male.end,
                  ),
                  timeLimit: my_slice_.intermediate.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.intermediate.female_un.start,
                    my_slice_.intermediate.female_un.end,
                  ),
                  timeLimit:
                    my_slice_.intermediate.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
      }
      break;
    case 'advanced':
      switch (ageGroup) {
        case AG_LIST[3]:
        case AG_LIST[0]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.male.start,
                    my_slice_.advanced.male.end,
                  ),
                  timeLimit: my_slice_.advanced.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
        case AG_LIST[1]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.male.start,
                    my_slice_.advanced.male.end,
                  ),
                  timeLimit: my_slice_.advanced.male.timeLimit[AG_LIST[1]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
          }
          break;
        case AG_LIST[2]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.male.start,
                    my_slice_.advanced.male.end,
                  ),
                  timeLimit: my_slice_.advanced.male.timeLimit[AG_LIST[2]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[2]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[2]],
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
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.male.start,
                    my_slice_.advanced.male.end,
                  ),
                  timeLimit: my_slice_.advanced.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.advanced.female_un.start,
                    my_slice_.advanced.female_un.end,
                  ),
                  timeLimit: my_slice_.advanced.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
      }
      break;
    default:
      switch (ageGroup) {
        case AG_LIST[0]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
          }
          break;
        case AG_LIST[3]:
        case AG_LIST[1]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[1]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[1]],
                },
              };
              break;
          }
          break;
        case AG_LIST[2]:
          switch (gender) {
            case 'male':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[2]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[2]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[2]],
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
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.male.start,
                    my_slice_.beginner.male.end,
                  ),
                  timeLimit: my_slice_.beginner.male.timeLimit[AG_LIST[0]],
                },
              };
              break;
            case 'female':
            case 'prefer not to say':
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
                },
              };
              break;
            default:
              ex_list = {
                ...ex_list,
                [grindWeekday]: {
                  exercises: INTERNAL_DATA[targetMuscle].slice(
                    my_slice_.beginner.female_un.start,
                    my_slice_.beginner.female_un.end,
                  ),
                  timeLimit: my_slice_.beginner.female_un.timeLimit[AG_LIST[0]],
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
