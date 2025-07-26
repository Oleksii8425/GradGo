using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class SkillMapper
    {
        public static SkillDto ToDto(this Skill skill)
        {
            return new SkillDto(
                skill.Id,
                skill.Title
            );
        }

        public static Skill ToSkill(this SkillCreateDto dto)
        {
            return new Skill { Title = dto.Title };
        }

        public static void UpdateSkillFromDto(this Skill skill, SkillUpdateDto dto)
        {
            skill.Title = dto.Title;
        }
    }
}
