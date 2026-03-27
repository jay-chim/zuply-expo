import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '@/constants/Colors';
import { QUESTIONNAIRE_STEPS } from '@/constants/MockData';
import { PrimaryButton } from '@/components/PrimaryButton';

// --- Step 1: 基本資料 ---
function Step1() {
  const [gender, setGender] = useState<string>('');
  const genders = ['男', '女', '不願透露'];

  return (
    <View style={styles.stepContent}>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>姓名</Text>
        <TextInput style={styles.input} placeholder="請輸入您的姓名" placeholderTextColor={Colors.gray300} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>年齡</Text>
        <TextInput style={styles.input} placeholder="例：35" keyboardType="numeric" placeholderTextColor={Colors.gray300} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>性別</Text>
        <View style={styles.chipGroup}>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.chip, gender === g && styles.chipActive]}
              onPress={() => setGender(g)}
            >
              <Text style={[styles.chipText, gender === g && styles.chipTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>身高 (cm)</Text>
        <TextInput style={styles.input} placeholder="例：168" keyboardType="numeric" placeholderTextColor={Colors.gray300} />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>體重 (kg)</Text>
        <TextInput style={styles.input} placeholder="例：65" keyboardType="numeric" placeholderTextColor={Colors.gray300} />
      </View>
    </View>
  );
}

// --- Step 2: 健康目標 ---
function Step2() {
  const [selected, setSelected] = useState<string[]>([]);
  const goals = ['提升免疫力', '改善睡眠', '提升精力', '骨骼關節健康', '皮膚健康', '心臟健康', '體重管理', '運動表現', '抗氧化抗衰老', '腸道健康'];

  const toggle = (g: string) => {
    setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  return (
    <View style={styles.stepContent}>
      <Text style={styles.fieldNote}>可選擇多個目標</Text>
      <View style={styles.chipGroup}>
        {goals.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.chip, selected.includes(g) && styles.chipActive]}
            onPress={() => toggle(g)}
          >
            {selected.includes(g) && <Ionicons name="checkmark" size={13} color={Colors.white} style={{ marginRight: 3 }} />}
            <Text style={[styles.chipText, selected.includes(g) && styles.chipTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>其他健康目標（選填）</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="請描述您的其他健康需求"
          placeholderTextColor={Colors.gray300}
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
}

// --- Step 3: 生活方式 ---
function Step3() {
  const [exercise, setExercise] = useState('');
  const [sleep, setSleep] = useState('');
  const [diet, setDiet] = useState('');

  const exerciseOpts = ['很少運動', '每週1-2次', '每週3-4次', '每天運動'];
  const sleepOpts = ['少於6小時', '6-7小時', '7-8小時', '8小時以上'];
  const dietOpts = ['均衡飲食', '素食', '低碳水', '高蛋白', '不規律'];

  return (
    <View style={styles.stepContent}>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>運動頻率</Text>
        <View style={styles.chipGroup}>
          {exerciseOpts.map(o => (
            <TouchableOpacity key={o} style={[styles.chip, exercise === o && styles.chipActive]} onPress={() => setExercise(o)}>
              <Text style={[styles.chipText, exercise === o && styles.chipTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>每日睡眠時間</Text>
        <View style={styles.chipGroup}>
          {sleepOpts.map(o => (
            <TouchableOpacity key={o} style={[styles.chip, sleep === o && styles.chipActive]} onPress={() => setSleep(o)}>
              <Text style={[styles.chipText, sleep === o && styles.chipTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>飲食習慣</Text>
        <View style={styles.chipGroup}>
          {dietOpts.map(o => (
            <TouchableOpacity key={o} style={[styles.chip, diet === o && styles.chipActive]} onPress={() => setDiet(o)}>
              <Text style={[styles.chipText, diet === o && styles.chipTextActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>工作壓力水平</Text>
        <View style={styles.chipGroup}>
          {['低', '中等', '高', '極高'].map(o => (
            <TouchableOpacity key={o} style={[styles.chip]} onPress={() => {}}>
              <Text style={styles.chipText}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// --- Step 4: 醫療與用藥 ---
function Step4() {
  const [hasCondition, setHasCondition] = useState<boolean | null>(null);
  const [hasMeds, setHasMeds] = useState<boolean | null>(null);
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);

  return (
    <View style={styles.stepContent}>
      <View style={styles.alertBox}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.info} />
        <Text style={styles.alertText}>此資料僅用於配方參考，藥劑師將全面審核您的配方</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>是否有長期慢性病？</Text>
        <View style={styles.yesNoRow}>
          {[{ label: '是', val: true }, { label: '否', val: false }].map(({ label, val }) => (
            <TouchableOpacity
              key={label}
              style={[styles.yesNoBtn, hasCondition === val && styles.yesNoBtnActive]}
              onPress={() => setHasCondition(val)}
            >
              <Text style={[styles.yesNoBtnText, hasCondition === val && styles.yesNoBtnTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {hasCondition && (
          <TextInput style={[styles.input, { marginTop: 8 }]} placeholder="請列出您的慢性病（如糖尿病、高血壓）" placeholderTextColor={Colors.gray300} />
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>目前是否有服用藥物？</Text>
        <View style={styles.yesNoRow}>
          {[{ label: '是', val: true }, { label: '否', val: false }].map(({ label, val }) => (
            <TouchableOpacity
              key={label}
              style={[styles.yesNoBtn, hasMeds === val && styles.yesNoBtnActive]}
              onPress={() => setHasMeds(val)}
            >
              <Text style={[styles.yesNoBtnText, hasMeds === val && styles.yesNoBtnTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {hasMeds && (
          <TextInput style={[styles.input, styles.inputMultiline, { marginTop: 8 }]} placeholder="請列出藥物名稱" placeholderTextColor={Colors.gray300} multiline numberOfLines={3} />
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>是否有過敏史？</Text>
        <View style={styles.yesNoRow}>
          {[{ label: '是', val: true }, { label: '否', val: false }].map(({ label, val }) => (
            <TouchableOpacity
              key={label}
              style={[styles.yesNoBtn, hasAllergy === val && styles.yesNoBtnActive]}
              onPress={() => setHasAllergy(val)}
            >
              <Text style={[styles.yesNoBtnText, hasAllergy === val && styles.yesNoBtnTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {hasAllergy && (
          <TextInput style={[styles.input, { marginTop: 8 }]} placeholder="請說明過敏物質" placeholderTextColor={Colors.gray300} />
        )}
      </View>
    </View>
  );
}

// --- Step 5: 確認提交 ---
function Step5() {
  return (
    <View style={styles.stepContent}>
      <View style={styles.confirmIllustration}>
        <Ionicons name="checkmark-circle" size={72} color={Colors.primary} />
        <Text style={styles.confirmTitle}>資料已填寫完畢</Text>
        <Text style={styles.confirmDesc}>
          {'點擊下方「生成配方」後，我們的AI系統將分析您的健康數據，\n並在藥劑師審核後為您生成個人化補充劑配方。'}
        </Text>
      </View>

      <View style={styles.confirmSummary}>
        {['基本資料', '健康目標', '生活方式', '醫療與用藥'].map(item => (
          <View key={item} style={styles.confirmRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
            <Text style={styles.confirmRowText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.privacyNote}>
        <Ionicons name="lock-closed-outline" size={14} color={Colors.gray400} />
        <Text style={styles.privacyText}>
          您的資料受香港PDPO個人資料私隱條例保護，僅用於生成健康建議
        </Text>
      </View>
    </View>
  );
}

const STEP_COMPONENTS = [Step1, Step2, Step3, Step4, Step5];

export default function QuestionnaireScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = QUESTIONNAIRE_STEPS.length;
  const progress = (currentStep + 1) / totalSteps;

  const step = QUESTIONNAIRE_STEPS[currentStep];
  const StepComponent = STEP_COMPONENTS[currentStep];
  const isLast = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/formula');
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => currentStep === 0 ? router.back() : setCurrentStep(s => s - 1)}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>健康問卷</Text>
          <Text style={styles.headerSub}>{currentStep + 1} / {totalSteps}</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.stepDots}>
          {QUESTIONNAIRE_STEPS.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.stepDot,
                idx < currentStep && styles.stepDotDone,
                idx === currentStep && styles.stepDotActive,
              ]}
            >
              {idx < currentStep && <Ionicons name="checkmark" size={10} color={Colors.white} />}
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step Header */}
        <View style={styles.stepHeader}>
          <View style={styles.stepNumberBadge}>
            <Text style={styles.stepNumberBadgeText}>步驟 {currentStep + 1}</Text>
          </View>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
        </View>

        {/* Step Form */}
        <View style={styles.formCard}>
          <StepComponent />
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navBar}>
        <PrimaryButton
          title={isLast ? '生成我的配方 →' : '下一步'}
          onPress={handleNext}
          size="lg"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.gray400,
    marginTop: 1,
  },
  progressContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.gray100,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  stepDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Shadow.sm,
  },
  stepDotDone: {
    backgroundColor: Colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 120,
  },
  stepHeader: {
    marginBottom: Spacing.xl,
  },
  stepNumberBadge: {
    backgroundColor: Colors.primaryBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: 8,
  },
  stepNumberBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.black,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 13,
    color: Colors.gray500,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Shadow.sm,
  },
  stepContent: {
    gap: 0,
  },
  fieldGroup: {
    marginBottom: Spacing.xl,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: 8,
  },
  fieldNote: {
    fontSize: 12,
    color: Colors.gray400,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.gray50,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray600,
  },
  chipTextActive: {
    color: Colors.white,
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  yesNoBtnActive: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  yesNoBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray600,
  },
  yesNoBtnTextActive: {
    color: Colors.primary,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.xl,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    color: Colors.info,
    lineHeight: 18,
  },
  confirmIllustration: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 12,
    marginBottom: 8,
  },
  confirmDesc: {
    fontSize: 13,
    color: Colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
  },
  confirmSummary: {
    gap: 12,
    marginBottom: Spacing.xl,
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  confirmRowText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray700,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.gray50,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  privacyText: {
    flex: 1,
    fontSize: 11,
    color: Colors.gray400,
    lineHeight: 16,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
  },
});
