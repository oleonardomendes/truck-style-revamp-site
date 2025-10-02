export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      vehicles: {
        Row: {
          air_conditioning: boolean | null
          automatic_transmission: boolean | null
          body_type: string | null
          brand: string
          category: string
          climate_control: boolean | null
          color: string | null
          created_at: string
          featured: boolean | null
          fleet_renewal: boolean | null
          high_roof: boolean | null
          id: string
          image: string | null
          images: string[] | null
          km: number
          km_range_500_600: boolean | null
          model: string
          model_year: number | null
          multiple_units: boolean | null
          onboard_computer: boolean | null
          owner_id: string | null
          owner_phone: string
          power_steering: boolean | null
          price: number
          sleeper_cabin: boolean | null
          traction: string | null
          type: string
          updated_at: string
          vehicle_details: string | null
          year: number
        }
        Insert: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand: string
          category?: string
          climate_control?: boolean | null
          color?: string | null
          created_at?: string
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string
          image?: string | null
          images?: string[] | null
          km: number
          km_range_500_600?: boolean | null
          model: string
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          owner_id?: string | null
          owner_phone: string
          power_steering?: boolean | null
          price: number
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string
          updated_at?: string
          vehicle_details?: string | null
          year: number
        }
        Update: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand?: string
          category?: string
          climate_control?: boolean | null
          color?: string | null
          created_at?: string
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string
          image?: string | null
          images?: string[] | null
          km?: number
          km_range_500_600?: boolean | null
          model?: string
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          owner_id?: string | null
          owner_phone?: string
          power_steering?: boolean | null
          price?: number
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string
          updated_at?: string
          vehicle_details?: string | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      vehicles_public: {
        Row: {
          air_conditioning: boolean | null
          automatic_transmission: boolean | null
          body_type: string | null
          brand: string | null
          category: string | null
          climate_control: boolean | null
          color: string | null
          created_at: string | null
          featured: boolean | null
          fleet_renewal: boolean | null
          high_roof: boolean | null
          id: string | null
          image: string | null
          km: number | null
          km_range_500_600: boolean | null
          model: string | null
          model_year: number | null
          multiple_units: boolean | null
          onboard_computer: boolean | null
          power_steering: boolean | null
          price: number | null
          sleeper_cabin: boolean | null
          traction: string | null
          type: string | null
          updated_at: string | null
          vehicle_details: string | null
          year: number | null
        }
        Insert: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand?: string | null
          category?: string | null
          climate_control?: boolean | null
          color?: string | null
          created_at?: string | null
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string | null
          image?: string | null
          km?: number | null
          km_range_500_600?: boolean | null
          model?: string | null
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          power_steering?: boolean | null
          price?: number | null
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
          year?: number | null
        }
        Update: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand?: string | null
          category?: string | null
          climate_control?: boolean | null
          color?: string | null
          created_at?: string | null
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string | null
          image?: string | null
          km?: number | null
          km_range_500_600?: boolean | null
          model?: string | null
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          power_steering?: boolean | null
          price?: number | null
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
          year?: number | null
        }
        Relationships: []
      }
      vehicles_secure: {
        Row: {
          air_conditioning: boolean | null
          automatic_transmission: boolean | null
          body_type: string | null
          brand: string | null
          category: string | null
          climate_control: boolean | null
          color: string | null
          created_at: string | null
          featured: boolean | null
          fleet_renewal: boolean | null
          high_roof: boolean | null
          id: string | null
          image: string | null
          km: number | null
          km_range_500_600: boolean | null
          model: string | null
          model_year: number | null
          multiple_units: boolean | null
          onboard_computer: boolean | null
          owner_id: string | null
          owner_phone: string | null
          power_steering: boolean | null
          price: number | null
          sleeper_cabin: boolean | null
          traction: string | null
          type: string | null
          updated_at: string | null
          vehicle_details: string | null
          year: number | null
        }
        Insert: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand?: string | null
          category?: string | null
          climate_control?: boolean | null
          color?: string | null
          created_at?: string | null
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string | null
          image?: string | null
          km?: number | null
          km_range_500_600?: boolean | null
          model?: string | null
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          owner_id?: string | null
          owner_phone?: never
          power_steering?: boolean | null
          price?: number | null
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
          year?: number | null
        }
        Update: {
          air_conditioning?: boolean | null
          automatic_transmission?: boolean | null
          body_type?: string | null
          brand?: string | null
          category?: string | null
          climate_control?: boolean | null
          color?: string | null
          created_at?: string | null
          featured?: boolean | null
          fleet_renewal?: boolean | null
          high_roof?: boolean | null
          id?: string | null
          image?: string | null
          km?: number | null
          km_range_500_600?: boolean | null
          model?: string | null
          model_year?: number | null
          multiple_units?: boolean | null
          onboard_computer?: boolean | null
          owner_id?: string | null
          owner_phone?: never
          power_steering?: boolean | null
          price?: number | null
          sleeper_cabin?: boolean | null
          traction?: string | null
          type?: string | null
          updated_at?: string | null
          vehicle_details?: string | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_public_vehicle_fields: {
        Args: Record<PropertyKey, never>
        Returns: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
