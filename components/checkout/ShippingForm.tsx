'use client';

import { useState } from 'react';
import { ShippingInfo } from '@/types';

interface Props {
  onNext: (info: ShippingInfo) => void;
}

export function ShippingForm({ onNext }: Props) {
  const [form, setForm] = useState<ShippingInfo>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'Canada',
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  const validate = () => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!form.firstName) newErrors.firstName = 'Required';
    if (!form.lastName)  newErrors.lastName  = 'Required';
    if (!form.email || !form.email.includes('@')) newErrors.email = 'Valid email required';
    if (!form.address)    newErrors.address    = 'Required';
    if (!form.city)       newErrors.city       = 'Required';
    if (!form.postalCode) newErrors.postalCode = 'Required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext(form);
  };

  const Field = ({
    name, label, type = 'text', placeholder,
  }: {
    name: keyof ShippingInfo; label: string; type?: string; placeholder?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors
                    focus:outline-none focus:ring-2 focus:ring-neutral-900
                    ${errors[name] ? 'border-red-400' : 'border-neutral-200'}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field name="firstName" label="First Name"  placeholder="Alina" />
        <Field name="lastName"  label="Last Name"   placeholder="Gordiy" />
      </div>
      <Field name="email"      label="Email"       type="email"  placeholder="alina@email.com" />
      <Field name="phone"      label="Phone"       type="tel"    placeholder="+1 (418) 000-0000" />
      <Field name="address"    label="Address"                   placeholder="123 Rue Saint-Jean" />
      <div className="grid grid-cols-2 gap-4">
        <Field name="city"       label="City"        placeholder="Québec" />
        <Field name="postalCode" label="Postal Code" placeholder="G1R 1A1" />
      </div>

      <button type="submit" className="btn-primary w-full">
        Continue to Payment →
      </button>
    </form>
  );
}