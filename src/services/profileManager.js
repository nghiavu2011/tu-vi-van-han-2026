/**
 * Profile Manager Service - Quản lý hồ sơ lá số
 */

const STORAGE_KEY = 'tuvi_profiles';
const PINNED_KEY = 'tuvi_pinned_profile';

/**
 * Get all saved profiles
 */
export function getAllProfiles() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

/**
 * Save a new profile
 */
export function saveProfile(laSo, interpretation = '') {
    const profiles = getAllProfiles();
    const id = `profile_${Date.now()}`;

    const newProfile = {
        id,
        hoTen: laSo.info.hoTen || 'Chưa đặt tên',
        ngaySinh: laSo.info.ngayDuong,
        gioiTinh: laSo.info.gioiTinh,
        tenNamAm: laSo.info.tenNamAm,
        banMenh: laSo.info.banMenh,
        tenCuc: laSo.info.tenCuc,
        laSo: laSo,
        interpretation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    profiles.unshift(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return newProfile;
}

/**
 * Update an existing profile
 */
export function updateProfile(id, updates) {
    const profiles = getAllProfiles();
    const index = profiles.findIndex(p => p.id === id);

    if (index !== -1) {
        profiles[index] = {
            ...profiles[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
        return profiles[index];
    }
    return null;
}

/**
 * Delete a profile
 */
export function deleteProfile(id) {
    const profiles = getAllProfiles();
    const filtered = profiles.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    // Unpin if this was the pinned profile
    if (getPinnedProfileId() === id) {
        unpinProfile();
    }
    return true;
}

/**
 * Get a single profile by ID
 */
export function getProfileById(id) {
    const profiles = getAllProfiles();
    return profiles.find(p => p.id === id) || null;
}

/**
 * Pin a profile as main chart
 */
export function pinProfile(id) {
    localStorage.setItem(PINNED_KEY, id);
}

/**
 * Unpin profile
 */
export function unpinProfile() {
    localStorage.removeItem(PINNED_KEY);
}

/**
 * Get pinned profile ID
 */
export function getPinnedProfileId() {
    return localStorage.getItem(PINNED_KEY);
}

/**
 * Get pinned profile data
 */
export function getPinnedProfile() {
    const pinnedId = getPinnedProfileId();
    return pinnedId ? getProfileById(pinnedId) : null;
}

/**
 * Search profiles by name
 */
export function searchProfiles(query) {
    const profiles = getAllProfiles();
    if (!query) return profiles;

    const lowerQuery = query.toLowerCase();
    return profiles.filter(p =>
        p.hoTen.toLowerCase().includes(lowerQuery) ||
        p.tenNamAm.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Export profile data as JSON
 */
export function exportProfileAsJSON(id) {
    const profile = getProfileById(id);
    if (!profile) return null;

    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tuvi_${profile.hoTen}_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    return true;
}

/**
 * Import profile from JSON file
 */
export function importProfileFromJSON(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        if (data.laSo && data.laSo.thapNhiCung) {
            data.id = `profile_${Date.now()}`;
            data.createdAt = new Date().toISOString();
            data.updatedAt = new Date().toISOString();

            const profiles = getAllProfiles();
            profiles.unshift(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
            return data;
        }
        return null;
    } catch {
        return null;
    }
}
