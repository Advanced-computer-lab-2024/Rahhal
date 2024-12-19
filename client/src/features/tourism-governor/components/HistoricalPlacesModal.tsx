import { GenericModal } from "@/components/GenericModal";
import {
  THistoricalPlace,
  TNewHistoricalPlace,
} from "@/features/tourism-governor/utils/tourism-governor-columns";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import {
  createHistoricalPlace,
  updateHistoricalPlace,
} from "@/api-calls/historical-places-api-calls";
import TimeRange from "@/components/TimeRange";
import LocationMap from "@/components/google-maps/LocationMap";
import { GenericSelect } from "@/components/GenericSelect";
import TagsSelector from "@/components/TagsSelector";
import { DEFAULTS } from "@/lib/constants";
import { fetchHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import PriceCategories from "@/components/price-categories";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multiple-selector";
import { TimePicker } from "@/components/ui/TimePicker";

interface HistoricalPlacesModalProps {
  historicalPlaceData?: THistoricalPlace;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  onDelete?: (id: string) => void;
  onSubmit?: (historicalPlace: THistoricalPlace) => void;
}

export function HistoricalPlacesModal({
  historicalPlaceData,
  dialogTrigger,
  userId,
  onDelete,
  onSubmit,
}: HistoricalPlacesModalProps) {
  const isNewHistoricalPlace: boolean = historicalPlaceData === undefined;
  const [modalHistoricalPlaceData, setModalHistoricalPlaceData] = useState<
    THistoricalPlace | undefined
  >(historicalPlaceData); // current activity data present in the modal

  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
    historicalTags: [],
  }); // holds the data fetched from the server like categories and preference tags, etc.

  const [historicalPlacesPictures, setHistoricalPlacesPictures] = useState<FileList | null>(null); // holds the pictures uploaded by the user

  const extractIds = (data: ({ _id: string } & Record<string, any>)[]) => {
    const ids = data.map(({ _id }) => _id);
    const FIRST_ELEMENT = 0;
    if (ids.length === 1) return ids[FIRST_ELEMENT];
    return ids;
  };

  const handleSubmit = async () => {
    if (!modalHistoricalPlaceData) return;

    try {
      if (isNewHistoricalPlace) {
        toast({
          title: "Saving",
          description: "Saving Historical Place",
          style: {
            backgroundColor: "#3B82F6",
            color: "white",
          },
        });
        const { _id, ...rest } = modalHistoricalPlaceData;
        const response = await createHistoricalPlace(
          {
            ...rest,
            owner: userId!,
            category: extractIds([modalHistoricalPlaceData.category]),
            preferenceTags: extractIds(modalHistoricalPlaceData.preferenceTags),
            tags: extractIds(modalHistoricalPlaceData.tags),
          } as TNewHistoricalPlace,
          userId!,
          historicalPlacesPictures,
        );

        if (
          response?.status === STATUS_CODES.STATUS_OK ||
          response?.status === STATUS_CODES.CREATED
        ) {
          toast({
            title: "Success",
            description: "Historical place saved successfully",
            style: {
              backgroundColor: "#34D399",
              color: "white",
            },
          });
          if (onSubmit) {
            onSubmit(modalHistoricalPlaceData);
            setModalHistoricalPlaceData(DEFAULTS.HISTORICAL_PLACE);
          }
        }
      } else {
        const response = await updateHistoricalPlace(
          {
            ...modalHistoricalPlaceData,
            category: extractIds(modalDBData.categories),
            preferenceTags: extractIds(modalHistoricalPlaceData.preferenceTags),
            tags: extractIds(modalHistoricalPlaceData.tags),
          },
          historicalPlacesPictures,
        );

        if (response?.status === STATUS_CODES.STATUS_OK) {
          toast({
            title: "Success",
            description: "Historical place updated successfully",
            style: {
              backgroundColor: "#34D399",
              color: "white",
            },
          });
          if (onSubmit) {
            onSubmit(modalHistoricalPlaceData);
            setModalHistoricalPlaceData(DEFAULTS.HISTORICAL_PLACE);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save historical place",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    if (modalHistoricalPlaceData && onDelete) {
      onDelete(modalHistoricalPlaceData._id);
    }
  };

  useEffect(() => {
    const init = async () => {
      const categories = await fetchCategories();
      const preferenceTags = await fetchPreferenceTags();
      const historicalTags = await fetchHistoricalTags();

      setModalDBData({ ...modalDBData, categories, preferenceTags, historicalTags });

      if (isNewHistoricalPlace) {
        setModalHistoricalPlaceData(DEFAULTS.HISTORICAL_PLACE);
      }
    };
    init();
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={historicalPlaceData?.name ?? "New Historical Place"}
      description="Historical Place Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
      showDeleteButton={!isNewHistoricalPlace}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Historical Place Name</Label>
          <Input
            type="text"
            value={modalHistoricalPlaceData?.name ?? ""}
            onChange={(e) =>
              setModalHistoricalPlaceData(
                modalHistoricalPlaceData
                  ? { ...modalHistoricalPlaceData, name: e.target.value }
                  : undefined,
              )
            }
            placeholder="Enter Historical Place Name"
          />
        </div>
      </div>

      <PriceCategories
        title="Prices"
        initialTicketTypes={modalHistoricalPlaceData?.price ?? {}}
        onPriceCategoriesChange={(value) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  price: value,
                }
              : undefined,
          );
        }}
      />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            value={modalHistoricalPlaceData?.description ?? ""}
            onChange={(e) =>
              setModalHistoricalPlaceData(
                modalHistoricalPlaceData
                  ? { ...modalHistoricalPlaceData, description: e.target.value }
                  : undefined,
              )
            }
            placeholder="Enter Historical Place Description"
          />
        </div>
      </div>

      <GenericSelect
        label="Category"
        placeholder="Select a category"
        options={modalDBData.categories.map((category: { name: any; _id: any }) => ({
          label: category.name,
          value: category._id,
        }))}
        onSelect={(value: string) => {
          console.log(value);
          const selectedCategory = modalDBData.categories.find(
            (category: { _id: string }) => category._id === value,
          );
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? { ...modalHistoricalPlaceData, category: selectedCategory }
              : undefined,
          );
        }}
        initialValue={modalHistoricalPlaceData?.category._id ?? ""}
      />

      <MultipleSelector
        placeholder={"Select preference tags"}
        defaultOptions={modalDBData.preferenceTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        emptyIndicator={<p className="text-gray-400 text-sm">No preference tags available</p>}
        onChange={(selectedOptions) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  preferenceTags: selectedOptions.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          );
        }}
        value={modalHistoricalPlaceData?.preferenceTags.map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))}
      />

      <MultipleSelector
        placeholder={"Select tags"}
        defaultOptions={modalDBData.historicalTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        emptyIndicator={<p className="text-gray-400 text-sm">No tags available</p>}
        onChange={(selectedOptions) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  tags: selectedOptions.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          );
        }}
        value={modalHistoricalPlaceData?.tags.map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))}
      />

      {/* <TimeRange
        initialCheckInTime={modalHistoricalPlaceData?.openingHours.open}
        initialCheckOutTime={modalHistoricalPlaceData?.openingHours.close}
        isEditingInitially={isNewHistoricalPlace}
        labels={{ startTimeLabel: "Opening Time", endTimeLabel: "Closing Time" }}
        onSave={(startTime, endTime) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  openingHours: { open: startTime!, close: endTime! },
                }
              : undefined,
          );
        }}
      /> */}

      <div className="flex grid-cols-2 gap-6 p-4">
        <div className="flex flex-col gap-2">
          <Label>Opening Time</Label>
          <TimePicker
            date={modalHistoricalPlaceData?.openingHours.open ?? new Date()}
            onChange={(date) => {
              setModalHistoricalPlaceData(
                modalHistoricalPlaceData
                  ? {
                      ...modalHistoricalPlaceData,
                      openingHours: {
                        open: date ?? new Date(),
                        close: modalHistoricalPlaceData.openingHours.close,
                      },
                    }
                  : undefined,
              );
            }}
            hourCycle={12}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Closing Time</Label>
          <TimePicker
            date={modalHistoricalPlaceData?.openingHours.close ?? new Date()}
            onChange={(date) => {
              setModalHistoricalPlaceData(
                modalHistoricalPlaceData
                  ? {
                      ...modalHistoricalPlaceData,
                      openingHours: {
                        open: modalHistoricalPlaceData.openingHours.open,
                        close: date ?? new Date(),
                      },
                    }
                  : undefined,
              );
            }}
            hourCycle={12}
          />
        </div>
      </div>

      <PictureCard
        title={"Photo Tour"}
        description={"Uploaded Photos"}
        initialImageSources={historicalPlaceData?.images ?? []}
        handleFileUploadCallback={(files) => setHistoricalPlacesPictures(files)}
      />

      <LocationMap
        isEditingInitially={isNewHistoricalPlace}
        initialLocation={
          modalHistoricalPlaceData
            ? {
                lat: modalHistoricalPlaceData.location.latitude,
                lng: modalHistoricalPlaceData.location.longitude,
              }
            : {
                lat: DEFAULTS.HISTORICAL_PLACE.location.latitude,
                lng: DEFAULTS.HISTORICAL_PLACE.location.longitude,
              }
        }
        onSave={(location) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  location: { latitude: location.lat, longitude: location.lng },
                }
              : undefined,
          )
        }
      />
    </GenericModal>
  );
}
