import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Search, X, ChevronRight, Briefcase, Check } from 'lucide-react';
import { jobCategories, IndustryGroup, Profession, Specialization } from '@/data/jobCategories';

interface IndustrySelectorProps {
    onSelect: (selected: string[]) => void;
    selectedIds?: string[];
}

export const IndustrySelector = ({ onSelect, selectedIds = [] }: IndustrySelectorProps) => {
    const [open, setOpen] = useState(false);
    const [activeGroup, setActiveGroup] = useState<IndustryGroup>(jobCategories[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelected, setTempSelected] = useState<Set<string>>(new Set(selectedIds));

    // Reset temp selection when opening
    const handleOpenchange = (newOpen: boolean) => {
        if (newOpen) {
            setTempSelected(new Set(selectedIds));
        }
        setOpen(newOpen);
    };

    const toggleSelection = (id: string) => {
        const newSelected = new Set(tempSelected);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setTempSelected(newSelected);
    };

    const handleConfirm = () => {
        onSelect(Array.from(tempSelected));
        setOpen(false);
    };

    // Find active group based on search selection if needed, but simple layout is:
    // Col 1: Groups (filtered by search? maybe not, search usually filters all items)
    // For this design, let's keep groups fixed on left, and search highlights items in col 2/3 or filters them.
    // Actually, TopCV search bar is global for the modal.

    const filteredProfessions = useMemo(() => {
        if (!searchTerm) return activeGroup.professions;

        // If searching, we might want to search across ALL groups? 
        // The TopCV UI typically keeps the hierarchy. Let's filter within the active group for now
        // or arguably, searching should find any profession/specialization across groups.
        // Let's implement simple filtering within active group first for better UX structure.

        const lowerTerm = searchTerm.toLowerCase();
        return activeGroup.professions.map(prof => ({
            ...prof,
            specializations: prof.specializations.filter(s =>
                s.name.toLowerCase().includes(lowerTerm)
            )
        })).filter(prof =>
            prof.name.toLowerCase().includes(lowerTerm) || prof.specializations.length > 0
        );
    }, [activeGroup, searchTerm]);

    // Helper to count selected items in a group
    const getSelectedCountInGroup = (group: IndustryGroup) => {
        let count = 0;
        group.professions.forEach(p => {
            p.specializations.forEach(s => {
                if (tempSelected.has(s.id)) count++;
            });
        });
        return count;
    };

    // derived display text
    const selectedCount = tempSelected.size;
    const buttonText = selectedCount > 0
        ? `${selectedCount} Categories Selected`
        : 'Select Job Categories';

    return (
        <Dialog open={open} onOpenChange={handleOpenchange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between md:w-[280px] bg-white text-left font-normal border-transparent hover:bg-white/90">
                    <div className="flex items-center gap-2 truncate">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate text-muted-foreground">
                            {buttonText}
                        </span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50 rotate-90" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>Select Job Categories</DialogTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for profession or specialization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden">
                    {/* Column 1: Industry Groups */}
                    <div className="w-1/3 border-r overflow-y-auto bg-muted/30">
                        {jobCategories.map(group => {
                            const count = getSelectedCountInGroup(group);
                            return (
                                <button
                                    key={group.id}
                                    onClick={() => setActiveGroup(group)}
                                    className={`w-full text-left p-4 hover:bg-accent/5 transition-colors flex items-center justify-between group ${activeGroup.id === group.id ? 'bg-white border-l-4 border-accent font-medium text-accent' : 'border-l-4 border-transparent'
                                        }`}
                                >
                                    <span className="truncate">{group.name}</span>
                                    {count > 0 && (
                                        <Badge variant="secondary" className="bg-accent text-white h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                                            {count}
                                        </Badge>
                                    )}
                                    <ChevronRight className={`h-4 w-4 text-muted-foreground ${activeGroup.id === group.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Column 2 & 3: Professions & Specializations */}
                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                        <h3 className="font-semibold text-lg mb-4 text-accent">{activeGroup.name}</h3>

                        {filteredProfessions.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">No categories found matching your search.</div>
                        ) : (
                            <div className="space-y-8">
                                {filteredProfessions.map(profession => (
                                    <div key={profession.id} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            {/* Profession Title (Could also be selectable if logic allows, keeping it as group header for specs now) */}
                                            <h4 className="font-medium text-base">{profession.name}</h4>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pl-4">
                                            {profession.specializations.map(spec => {
                                                const isSelected = tempSelected.has(spec.id);
                                                return (
                                                    <button
                                                        key={spec.id}
                                                        onClick={() => toggleSelection(spec.id)}
                                                        className={`
                                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all
                                ${isSelected
                                                                ? 'bg-accent text-white border-accent shadow-sm'
                                                                : 'bg-white text-foreground border-border hover:border-accent hover:text-accent'
                                                            }
                              `}
                                                    >
                                                        {spec.name}
                                                        {isSelected && <Check className="h-3 w-3" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-4 border-t bg-muted/10 flex justify-between sm:justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        {tempSelected.size} items selected
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setTempSelected(new Set())}>
                            Clear All
                        </Button>
                        <Button onClick={handleConfirm} disabled={tempSelected.size === 0}>
                            Apply Selection
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
