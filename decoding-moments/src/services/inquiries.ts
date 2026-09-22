import { postAPI } from './api';
import type { InquiryFormData } from '../types';

export async function submitInquiry(data: InquiryFormData) {
  return postAPI('/inquiries', {
    ...data,
    status: 'new',
    source: 'portfolio-website',
  });
}
