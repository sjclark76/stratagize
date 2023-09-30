export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          athlete_id: number
          created_at: string
          detailed_event: Json | null
          id: number
          moving_time: number
          name: string
          sport_type: Database["public"]["Enums"]["sport_type"]
          start_date: string
          start_date_local: string | null
        }
        Insert: {
          athlete_id: number
          created_at?: string
          detailed_event?: Json | null
          id: number
          moving_time: number
          name: string
          sport_type: Database["public"]["Enums"]["sport_type"]
          start_date: string
          start_date_local?: string | null
        }
        Update: {
          athlete_id?: number
          created_at?: string
          detailed_event?: Json | null
          id?: number
          moving_time?: number
          name?: string
          sport_type?: Database["public"]["Enums"]["sport_type"]
          start_date?: string
          start_date_local?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          }
        ]
      }
      athletes: {
        Row: {
          created_at: string
          hour_goal: number
          id: number
          is_onboarded: boolean
          refresh_token: string | null
        }
        Insert: {
          created_at?: string
          hour_goal: number
          id: number
          is_onboarded: boolean
          refresh_token?: string | null
        }
        Update: {
          created_at?: string
          hour_goal?: number
          id?: number
          is_onboarded?: boolean
          refresh_token?: string | null
        }
        Relationships: []
      }
      strava_events: {
        Row: {
          created_at: string | null
          data: Json
          id: number
          is_processed: boolean
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: number
          is_processed?: boolean
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: number
          is_processed?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      sport_type:
        | "AlpineSki"
        | "BackcountrySki"
        | "Badminton"
        | "Canoeing"
        | "Crossfit"
        | "EBikeRide"
        | "Elliptical"
        | "EMountainBikeRide"
        | "Golf"
        | "GravelRide"
        | "Handcycle"
        | "HighIntensityIntervalTraining"
        | "Hike"
        | "IceSkate"
        | "InlineSkate"
        | "Kayaking"
        | "Kitesurf"
        | "MountainBikeRide"
        | "NordicSki"
        | "Pickleball"
        | "Pilates"
        | "Racquetball"
        | "Ride"
        | "RockClimbing"
        | "RollerSki"
        | "Rowing"
        | "Run"
        | "Sail"
        | "Skateboard"
        | "Snowboard"
        | "Snowshoe"
        | "Soccer"
        | "Squash"
        | "StairStepper"
        | "StandUpPaddling"
        | "Surfing"
        | "Swim"
        | "TableTennis"
        | "Tennis"
        | "TrailRun"
        | "Velomobile"
        | "VirtualRide"
        | "VirtualRow"
        | "VirtualRun"
        | "Walk"
        | "WeightTraining"
        | "Wheelchair"
        | "Windsurf"
        | "Workout"
        | "Yoga"
        | "Unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

