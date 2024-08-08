import { auth } from '@/auth';
import { Creator, Previas } from '@/types/data';
import { isBefore, isSameDay, format, compareAsc, subDays, formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { today } from '@/lib/constants';
import { CreateUserFromSchema } from './schemas';
import { FormState, ValidatedErrors } from '@/types/onboarding';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface calculateAge {
  dob_day: string;
  dob_month: string;
  dob_year: string;
}

export function calculateAge({ dob_day, dob_month, dob_year }: calculateAge) {
  const day = parseInt(dob_day);
  const month = parseInt(dob_month) - 1;
  const year = parseInt(dob_year);

  const birthDate = new Date(year, month, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

type SortedPrevias = {
  previas?: Previas[];
  sortCriteria?: string;
  needsToValidate?: boolean;
};

const previaValidation = async ({ previas }: SortedPrevias) => {
  const session = await auth();
  return (previas || [])?.filter((previa: { date?: Date; creator?: Creator | null }) => {
    const previaDate = new Date(previa?.date || '');
    const isSameDayToday = isSameDay(previaDate, today);
    const isExpired = isBefore(previaDate, today);
    const isCreator = session?.user?.email === previa.creator;
    return (!isExpired || isSameDayToday) && !isCreator;
  });
};

const parseDates = (date: string | number | Date) => new Date(date);

// Ordenar validPrevias según el previas de ordenación
export const getSortedPrevias = async ({
  previas = [],
  sortCriteria = 'date',
  needsToValidate = true,
}: SortedPrevias) => {
  const validPrevias = needsToValidate ? await previaValidation({ previas }) : previas;

  return [...validPrevias]?.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = parseDates(a?.date || '');
      const dateB = parseDates(b?.date || '');
      return compareAsc(dateA, dateB);
    } else if (sortCriteria === 'participants') {
      return Number(b.participants) - Number(a.participants);
    }
    return 0;
  });
};

type FormattedDate = {
  date?: Date | string | number;
};
export const formattedDate = ({ date }: FormattedDate) => {
  const inputDate = new Date(date as Date);
  return isSameDay(today, inputDate)
    ? 'Today'
    : format(date as Date, "EEEE d 'de' MMMM", { locale: es });
};

export const sanitizeImages = (images?: string[] | string) =>
  (Array.isArray(images) && images?.filter((image) => image)) || [];

export const getUserValues = (formData: FormData): FormState | ValidatedErrors => {
  const intitalValues = {
    dob_day: formData.get('dob_day'),
    dob_month: formData.get('dob_month'),
    dob_year: formData.get('dob_year'),
    name: formData.get('name'),
    about: formData.get('about'),
    show_interest: formData.get('show_interest'),
    gender_identity: formData.get('gender_identity'),
    url_img: formData.get('url_img'),
    previas_interest: formData.get('previas_interest'),
  };
  const validatedFields = CreateUserFromSchema.safeParse(intitalValues);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }
  const { dob_day, dob_month, dob_year } = validatedFields.data;
  const calculatedAge = calculateAge({ dob_day, dob_month, dob_year });
  const newFormData = {
    ...validatedFields.data,
    age: calculatedAge,
  };
  return newFormData;
};

export const getFormatedDate = (date?: Date) => {
  const inputDate = new Date(date as Date);
  const formattedDate = isSameDay(today, inputDate)
    ? 'Today'
    : isBefore(inputDate, today)
      ? 'Due'
      : format(inputDate, "EEEE d 'de' MMMM", { locale: es });

  return formattedDate;
};

export const editDisabled = (date?: Date | string) => isBefore(new Date(date as Date), today);

type HandleQueryParams = {
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  replace: Function;
  values: {
    value?: string;
    query: string;
  }[];
};

export const handleQueryParams = ({
  searchParams,
  pathname,
  replace,
  values,
}: HandleQueryParams) => {
  const params = new URLSearchParams(searchParams);
  values?.forEach(({ value, query }) => {
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
  });

  replace(`${pathname}?${params.toString()}`);
};

export const formatTime = (date?: number) => formatRelative(subDays(date || 0, 3), new Date());