# Real-World RTL Examples from Codebase

## ParticipantChallengeDetails Component

### Status Badge with Countdown
```tsx
// File: ParticipantChallengeDetails.tsx:240
<div className="flex items-center gap-3 flex-wrap" dir="rtl">
  <Badge variant="success" size="md" dot animate>
    {t('giveaway.status.live')}
  </Badge>
  <CountdownTimer endTime={challenge.endTime} />
</div>
```

### Challenge Title with Prize
```tsx
// File: ParticipantChallengeDetails.tsx:284
<div className="flex flex-col gap-2" dir="rtl">
  <Typography variant="h4" className="text-right font-bold">
    {challenge.title}
  </Typography>
  <div className="flex items-center gap-2">
    <icons.content.gift size={24} />
    <Typography variant="h5" className="text-accent text-right">
      {challenge.prizeAmount.toLocaleString('en-US')} ريال
    </Typography>
  </div>
</div>
```

## MinimalInfluencerCard Component

### Avatar with Name
```tsx
// File: minimal-influencer-card.tsx:40-55
<div className="flex items-center gap-3" dir="rtl">
  <Avatar src={avatarUrl} alt={name} size="md" />
  <Typography variant="body" dir="rtl" className="text-right font-medium">
    {name}
  </Typography>
</div>
```

## FormSection Component

### Collapsible Form Section Header
```tsx
// File: FormSection.tsx
<div
  className="flex items-center justify-between cursor-pointer p-4"
  dir="rtl"
  onClick={toggleExpanded}
>
  <div className="flex items-center gap-3">
    <Typography variant="h5" className="text-right">
      {title}
    </Typography>
    {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
  </div>
  <ChevronLeft className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
</div>
```

## ImageUploader Component

### Image Thumbnails with Badges
```tsx
// File: ImageUploader.tsx
<div className="relative">
  <img src={imageUrl} alt="uploaded" className="w-full h-full object-cover" />
  {/* Badge in top-right for RTL */}
  <Badge className="absolute top-2 right-2" variant="info">
    صورة {index + 1}
  </Badge>
  {/* Delete button in top-left for RTL */}
  <button
    className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1"
    onClick={() => handleDelete(index)}
  >
    <X size={16} />
  </button>
</div>
```

## StatsDisplay Component

### Statistics Card Layout
```tsx
// File: StatsDisplay.tsx
<div className="grid grid-cols-2 gap-4" dir="rtl">
  <div className="flex flex-col gap-1">
    <Typography variant="caption" className="text-right text-muted">
      {t('stats.participants')}
    </Typography>
    <Typography variant="h3" className="text-right">
      {participantCount.toLocaleString('en-US')}
    </Typography>
  </div>
  <div className="flex flex-col gap-1">
    <Typography variant="caption" className="text-right text-muted">
      {t('stats.winners')}
    </Typography>
    <Typography variant="h3" className="text-right">
      {winnerCount.toLocaleString('en-US')}
    </Typography>
  </div>
</div>
```

## AuthForm Component

### Phone Input with Country Code
```tsx
// File: AuthForm.tsx
<div className="flex gap-2" dir="rtl">
  <Select
    dir="rtl"
    className="w-24"
    value="+966"
    disabled
  >
    <option>+966</option>
  </Select>
  <Input
    dir="rtl"
    className="flex-1 text-right"
    placeholder={t('auth.phone.placeholder')}
    value={phoneNumber}
    onChange={handlePhoneChange}
  />
</div>
```

## Header Component

### Navigation Header
```tsx
// File: Header.tsx
<header className="sticky top-0 z-50 bg-background border-b">
  <div className="container mx-auto px-4" dir="rtl">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-4">
        <Logo />
        <Typography variant="h5" className="text-right">
          {t('app.name')}
        </Typography>
      </div>
      <nav className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <icons.navigation.menu />
        </Button>
      </nav>
    </div>
  </div>
</header>
```

## Card Component with Complex Layout

### Activity Card
```tsx
// File: ActivityCard.tsx
<Card className="p-4" dir="rtl">
  <div className="flex items-start justify-between mb-3">
    <div className="flex-1">
      <Typography variant="h6" className="text-right mb-1">
        {activity.title}
      </Typography>
      <Typography variant="caption" className="text-right text-muted">
        {formatDate(activity.date)}
      </Typography>
    </div>
    <Badge variant={getStatusVariant(activity.status)}>
      {t(`status.${activity.status}`)}
    </Badge>
  </div>

  <div className="flex items-center gap-4 mt-4" dir="rtl">
    <div className="flex items-center gap-2">
      <icons.content.users size={16} />
      <Typography variant="body-small" className="text-right">
        {activity.participants}
      </Typography>
    </div>
    <div className="flex items-center gap-2">
      <icons.content.gift size={16} />
      <Typography variant="body-small" className="text-right">
        {activity.prizes} جائزة
      </Typography>
    </div>
  </div>
</Card>
```