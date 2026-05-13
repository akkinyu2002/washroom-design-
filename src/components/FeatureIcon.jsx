const iconPaths = {
  materials: (
    <>
      <ellipse cx="32" cy="50" rx="16" ry="5" className="feature-icon__shadow" />
      <path d="M32 9 49 24 32 55 15 24Z" className="feature-icon__side" />
      <path d="M32 9 49 24 32 30 15 24Z" className="feature-icon__top" />
      <path d="M15 24 32 30 32 55Z" className="feature-icon__left" />
      <path d="M49 24 32 30 32 55Z" className="feature-icon__right" />
      <path d="M25 23 32 13 39 23 32 27Z" className="feature-icon__glint" />
    </>
  ),
  storage: (
    <>
      <ellipse cx="34" cy="52" rx="18" ry="5" className="feature-icon__shadow" />
      <path d="M17 18 28 12 48 17 37 24Z" className="feature-icon__top" />
      <path d="M17 18 37 24 37 48 17 42Z" className="feature-icon__left" />
      <path d="M37 24 48 17 48 40 37 48Z" className="feature-icon__right" />
      <path d="M20 24 34 28M20 32 34 36M20 40 34 44" className="feature-icon__line" />
      <path d="M42 27 45 25M42 34 45 32" className="feature-icon__handle" />
    </>
  ),
  friendly: (
    <>
      <ellipse cx="32" cy="51" rx="17" ry="5" className="feature-icon__shadow" />
      <path d="M18 18 31 12 46 17 33 24Z" className="feature-icon__top" />
      <path d="M18 18 33 24 33 47 18 41Z" className="feature-icon__left" />
      <path d="M33 24 46 17 46 40 33 47Z" className="feature-icon__right" />
      <path d="m23 32 5 7 12-14" className="feature-icon__check" />
    </>
  ),
  timeless: (
    <>
      <ellipse cx="32" cy="52" rx="17" ry="5" className="feature-icon__shadow" />
      <circle cx="32" cy="30" r="15" className="feature-icon__ring" />
      <circle cx="32" cy="30" r="9" className="feature-icon__face" />
      <path d="M32 21v10l7 4" className="feature-icon__hand" />
      <path d="M22 42 18 47M42 42l4 5" className="feature-icon__stand" />
    </>
  ),
}

export default function FeatureIcon({ kind }) {
  return (
    <svg className="feature-icon" viewBox="0 0 64 64" aria-hidden="true">
      {iconPaths[kind] ?? iconPaths.materials}
    </svg>
  )
}
